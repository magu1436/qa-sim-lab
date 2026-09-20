
# 技術・構成方針
技術選定は本プロジェクトの `QASimLab技術選定書.md` を正とする。Frontendは Vite + React + TypeScript、Backend APIは Ruby on Rails（API mode）、DBはPostgreSQL、SimulationWorkerとAnalysisWorkerはRustで実装する。

FrontendはHTTPでBackend APIを利用する。Backend APIと各Workerは直接通信せず、同じPostgreSQLおよびファイルシステムを介して連携する。WorkerはRails APIやActive Recordを利用せず、PostgreSQLの物理テーブルを直接参照・更新する。

# 認証方針
WebブラウザではSession Cookie認証を利用する。`User` はActive Recordモデルとし、`student_id` とパスワードで認証する。パスワード管理は `bcrypt` + `has_secure_password` とし、DBには `password_digest` を保存する。

認証成功後はRails Sessionに `user_id` を保持し、以降のリクエストではSessionから有効なユーザーを取得して `current_user` とする。ログアウト時はSessionを破棄する。Rails API modeでもCookie・Sessionを扱うために必要な機構を有効にする。

認証方法から `current_user` を解決する処理と、ControllerやService層での権限判定・業務処理を分離する。業務処理はSessionを直接参照せず、`current_user` を基準に動作する。認証の要否とユーザー権限は各APIの既存仕様に従う。

将来はCLI等のAPIクライアント向けにAPI Token認証を追加し、WebのSession Cookie認証と併用できる構成とする。API Token認証はMVP対象外とし、JWTは現時点では採用せず、将来方式としても固定しない。

# 共有DB契約
DBスキーマの実装上の正は Rails Active Record Migration とする。Rust Worker側では別のMigrationを管理しない。

```text
Rails Active Record Migration
        ↓
PostgreSQL Schema
        ↑
SimulationWorker / AnalysisWorker（Rustによる直接参照・更新）
```

物理テーブル名とモデル名は以下の対応とする。APIのURL・JSONキー・関連名はテーブル名の複数形化によって変更しない。

| モデル名 | 物理テーブル名 |
| --- | --- |
| `User` | `users` |
| `SimulationTask` | `simulation_tasks` |
| `SimulationConfig` | `simulation_configs` |
| `SimulationInputFile` | `simulation_input_files` |
| `SimulationResult` | `simulation_results` |
| `SimulationResultSummary` | `simulation_result_summaries` |
| `SimulationResultTopState` | `simulation_result_top_states` |

RailsとWorkerは、テーブル名、カラム名、PostgreSQLのDB型、NULL制約、UNIQUE制約、外部キー、`status` 等の列挙値、`created_at` 等の日時項目について同じ物理スキーマを契約として扱う。変更時は両者の読み書きの互換性を確認する。モデル表の `int`・`float` 等は概念型であり、物理DB型はER図とMigrationに整合させる。Worker側でRailsの型推論やコールバックを前提にしない。

モデル表の `required` はDBのNOT NULL、`nullable` はNULL許可、`unique` はUNIQUE制約に対応させる。1対1の関連は参照元の外部キーカラムにUNIQUE制約を設ける。主な外部キーは以下の通りとする。

| 参照元カラム | 参照先 | UNIQUE |
| --- | --- | --- |
| `simulation_tasks.user_id` | `users.id` | なし |
| `simulation_configs.task_id` | `simulation_tasks.id` | あり |
| `simulation_input_files.config_id` | `simulation_configs.id` | あり |
| `simulation_results.task_id` | `simulation_tasks.id` | あり |
| `simulation_result_summaries.result_id` | `simulation_results.id` | あり |
| `simulation_result_top_states.summary_id` | `simulation_result_summaries.id` | なし |

`users.student_id` は一意とし、`simulation_result_top_states` には `(summary_id, rank)` と `(summary_id, state)` のUNIQUE制約を設ける。これらの制約はActive RecordのValidationだけに依存せずMigrationで定義する。

`status` は各仕様書に記載された大文字の文字列を保存する。Rails内部の列挙値の番号をWorkerとの契約にしない。日時項目はDB型、タイムゾーンの扱い、精度、設定・更新タイミングをMigrationおよび実装で一致させる。Workerが作成・更新する行では、Railsの自動設定を前提にせず必要な日時値を設定する。APIの日時表現は後述の既存形式を維持する。

# API
## URLについて
各アプリケーションのAPIのURLは、必ず `api/(アプリケーション名)/` から始まることとする。  
これは `api/{application_name}/...` の方針を表す。Railsの `config/routes.rb` で既存URLとHTTPメソッドを維持する。API処理にはAction Controller、DB操作にはActive Record、JSON表現にはActive Model / Active Record等のRails標準機能を利用する。Railsの規約に合わせるためにJSONキー、HTTPステータスコード、独自エラーコードを変更しない。

## 失敗時のレスポンスについて
失敗時に返却されるレスポンスは以下の形式とする。  
- 可能な限り明確なステータスコードを設定する
- 同じステータスコードで複数種類のエラーを返す可能性がある場合は、レスポンスのボディに別途コードを文字列で設定して返却する。

ステータスコードが重複する可能性があるレスポンスのボディ
```JSON
{
	code: string,
	message: string
}
```
## ボディに日時文字列を含む場合
フロントとバックエンドでやり取りするJSONデータに日時を含む場合、ISO 8601を基本として以下の形式の文字列として記述する。  

| 項目    | 形式                  | 例                   |
| ----- | ------------------- | ------------------- |
| 日付のみ  | yyyy-MM-dd          | 2026-05-07          |
| 時間のみ  | HH:mm:ss            | 18:09:32            |
| 日付＋時間 | yyyy-MM-ddTHH:mm:ss | 2026-05-07T18:09:32 |



# ファイルの保存先
シミュレーションに関連するファイルについては、必ずファイル形式は `.bin` とし、 `{root}/bin/{task_id}/` に保存する。  
`{root}` は環境変数から読み取る。  
