# QASim Lab 技術選定書

## 1. 本書の目的

本書は、QASim Lab の実装に用いる技術スタック、採用理由、システム構成方針を整理するための文書である。

要件定義書では「何を実現するか」を扱い、本書では「どの技術で実現するか」を扱う。

## 2. 技術選定の基本方針

QASim Lab では、以下の方針に基づいて技術を選定する。

- 研究室内で継続的に保守できること
- 実装者が扱いやすいこと
- シミュレーション処理とWebアプリケーション処理を分離できること
- 長時間実行されるGPUシミュレーションを安全に管理できること
- 将来的にシミュレーション結果を研究資源として蓄積・検索できること
- 初期開発では、過度に複雑な分散構成を避けること

## 3. 全体構成

QASim Lab は、以下の構成要素に分けて実装する。

```text
[Browser]
   |
   | HTTP/HTTPS
   v
[Nginx]
   |----------------------|
   v                      v
[Frontend]        [Rails Backend API]
                          |
                          | DB access
                          v
                    [PostgreSQL]
                      ^         ^
                      |         | DB polling / update
                      |         |
          [Simulation Worker] [Analysis Worker]
                  |
                  | GPU execution
                  v
            [GPU QA Simulator]
```

### 3.1 構成方針

- フロントエンドは、ユーザー操作画面を提供する。
- バックエンドAPIは、Ruby on Rails の API mode で実装し、ユーザー認証、タスク作成、タスク参照、結果参照などを担当する。
- Simulation Worker と Analysis Worker は、DB上の実行待ちタスクを取得して各処理を実行する。
- Backend API と各Workerは直接通信せず、DBを介して疎結合に連携する。
- Nginx は、フロントエンド配信およびAPIへのリバースプロキシとして利用する。

## 4. 採用技術一覧

| 領域      | 採用技術                  | 用途                   |
| ------- | --------------------- | -------------------- |
| フロントエンド | Vite                  | Reactアプリケーションの開発・ビルド |
| フロントエンド | React                 | UI構築                 |
| フロントエンド | TypeScript            | 型安全なフロントエンド実装        |
| フロントエンド | MUI                   | UIコンポーネント・スタイリング     |
| フロントエンド | Tanstack Query        | 非同期状態の管理             |
| フロントエンド | React Router          | 画面遷移・ルーティング          |
| フロントエンド | Axios                 | API通信                |
| バックエンド  | Ruby                  | バックエンド実装言語           |
| バックエンド  | Ruby on Rails（API mode） | JSON API、ルーティング、モデル、認証 |
| バックエンド  | Active Record         | ORM、モデル、DB操作、Migration |
| バックエンド  | bcrypt                | パスワードハッシュ化・認証        |
| バックエンド  | rack-cors             | CORS対応               |
| バックエンド  | pg                    | PostgreSQL接続         |
| バックエンド  | Puma                  | 本番環境でのRails実行        |
| バックエンド  | Bundler               | gem依存関係管理            |
| DB      | PostgreSQL            | アプリケーションデータの永続化      |
| Worker  | Rust                  | Simulation Worker・Analysis Worker実装 |
| GPU計算   | 既存GPU QAシミュレータライブラリ   | 量子アニーリングシミュレーション実行   |
| Webサーバー | Nginx                 | 静的ファイル配信・リバースプロキシ    |
| プロセス管理  | systemd               | 常駐プロセス管理・自動起動        |

## 5. フロントエンド技術

### 5.1 採用技術

- Vite
- React
- TypeScript
- MUI
- Tanstack Query
- React Router
- Axios

### 5.2 採用理由

#### Vite

Vite は開発サーバーの起動が速く、React + TypeScript の開発環境を構築しやすい。初期開発の速度を重視する本プロジェクトに適している。

#### React

React はコンポーネントベースでUIを構築でき、タスク一覧、タスク詳細、結果表示などの画面を分割して実装しやすい。

#### TypeScript

本システムでは、シミュレーションタスク、ユーザー、結果などのデータ構造を扱うため、型定義によってフロントエンド実装の安全性を高められる。

#### MUI

MUI はフォーム、テーブル、ダイアログ、ボタンなどの基本UIを短時間で構築できる。研究室内ツールとして、見た目の作り込みよりも機能実装を優先する場合に有効である。

#### Tanstack Query

状態管理をより効率的に行うようにする。ローディング状態やエラーの有無を管理するステートを自分で定義せず、 `Tanstack Query` に委譲できる。

#### React Router

タスク一覧、タスク詳細、ユーザー設定などをURLベースで管理するために利用する。

#### Axios

バックエンドAPIとのHTTP通信を扱うために利用する。エラーレスポンスの取得や共通設定の管理がしやすい。

### 5.3 開発時の方針

- 開発中は Vite の開発サーバーを使用する。
- 開発中のAPI通信は、Vite の proxy 設定によりバックエンドへ転送する。
- 本番環境では、ビルド済みフロントエンドを Nginx で配信する。

### 5.4 バージョン方針

具体的なバージョンは、環境構築時に安定版を確認して決定する。

| 技術 | バージョン方針 |
|---|---|
| TypeScript | 安定版を採用 |
| Vite | 安定版を採用 |
| React | 安定版を採用 |
| React Router | 安定版を採用 |
| MUI | 安定版を採用 |
| Axios | 安定版を採用 |

## 6. バックエンド技術

### 6.1 採用技術

- Ruby
- Ruby on Rails（API mode）
- Active Record
- bcrypt
- rack-cors
- pg
- Puma
- Bundler

### 6.2 採用理由

#### Ruby on Rails（API mode）

Ruby on Rails は、ルーティング、Controller、モデル、Migration、Validationなど、Web APIの実装に必要な機能を一貫した規約の下で提供する。QASim Labではフロントエンドと分離したJSON APIとして利用するため、HTMLビュー等を省いた API mode を前提とする。

API URL、HTTPメソッド、リクエスト・レスポンスのJSON形式、エラーコード等の既存仕様は原則として変更しない。主なAPI処理は `ActionController::API` を基盤とし、URLルーティングを `config/routes.rb`、JSONレスポンスを `render json:` で実装する。モデルのJSON表現にはRails標準のActive Model／Active Recordの仕組みを利用する。

入力値は Strong Parameters で許可し、モデルの基本的な値検証には Active Record Validation を利用する。認証、権限、状態遷移などの業務ルールはControllerまたはService層に実装し、複数のDB更新を伴う処理には `ActiveRecord::Base.transaction` を利用する。

Railsには管理画面をMVPでは導入しない。開発・運用上必要になった場合に、ActiveAdmin等の追加を検討する。

#### Active Record・pg

タスク、結果、ユーザーなどのDBモデルは `ActiveRecord::Base` を基盤として定義し、DB操作とMigrationには Active Record を利用する。PostgreSQL Adapterには `pg` を採用する。

Backend APIとRust製Workerは同じPostgreSQL上のデータを介して連携する。そのため、Railsへの移行時も、Workerが参照・更新するテーブル構造、カラム、制約、状態値との整合性を維持する。Rails APIからWorkerを直接呼び出す構成にはしない。

#### 認証

`User` は通常のActive Recordモデルとして定義する。パスワード管理には `bcrypt` と `has_secure_password` を利用し、DBには平文パスワードではなく `password_digest` を保存する。

ログインIDは従来どおり `student_id` とし、認証方式はCookie／Sessionベースとする。JWTおよびDeviseはMVPでは採用しない。

#### rack-cors

開発環境でVite開発サーバーとRails APIが別オリジンになる場合のCORS制御には `rack-cors` を利用する。本番環境ではNginxによりフロントエンドとBackend APIを同一オリジンで提供する。別オリジンで提供する場合は、許可するオリジンを明示的に限定する。

#### 環境変数・秘密情報管理

設定値は `ENV` を基本として管理し、Rails固有の秘密情報にはRails credentialsも利用できるものとする。`DATABASE_URL`、`QASIM_ROOT`、入力・結果・ログの保存先など、Workerと共有するサーバー設定は環境変数として管理する。

`.env` が必要な場合に限り、開発環境向けに `dotenv-rails` の導入を検討する。依存関係には含まれる秘密情報を記述せず、開発環境と本番環境の設定差分をコード変更なしで切り替えられるようにする。

#### 検索・絞り込み

一覧APIの検索・絞り込みは Active Record のQuery／Scopeで実装する。MVPでは `status`、`problem_name`、`user`、`created_at` の範囲、並び順、`offset`／`limit` を扱う。検索要件が複雑化した場合に限り、専用gemの導入を検討する。

#### 入力ファイル処理

CSVの読み込みにはRuby標準の `CSV`、バイナリの読み書き・変換には `Array#pack`／`String#unpack` を利用する。ファイルサイズ、要素数、値の妥当性等もRuby標準APIで検証する。数値計算ライブラリが必要になるほど処理が複雑化した場合に限り、追加ライブラリを検討する。

対角項データの要素型について、関連仕様書に `f64` と `i32` の記述が混在しているため、Rails実装とは別の仕様課題として実装前に統一する。

#### OpenAPI

MVPでは既存Markdown仕様書とRailsのRequest Specを優先し、OpenAPI自動生成ツールは必須依存にしない。自動生成が必要になった段階で `rswag` の導入を検討する。

#### Puma・Bundler

本番環境ではPumaをRailsのApplication Serverとして利用し、systemdにより常駐管理する。NginxがHTTPリクエストを受け取り、Pumaへリバースプロキシする。

```text
[Nginx]
   |
   v
[Puma]
   |
   v
[Rails]
```

gemの依存関係はBundlerを用いて `Gemfile`／`Gemfile.lock` で管理し、開発環境と本番環境の再現性を確保する。

### 6.3 バックエンドの責務

バックエンドAPIは、主に以下を担当する。

- ユーザー作成
- ログイン・ログアウト
- ユーザー情報編集
- シミュレーションタスク作成
- シミュレーションタスク一覧・詳細取得
- シミュレーション結果情報取得
- 結果ファイルのダウンロード制御
- 入力ファイルの受け取り・保存
- 権限管理
- APIエラーレスポンス生成

### 6.4 Workerとの連携方針

バックエンドAPIは、Simulation WorkerおよびAnalysis Workerを直接呼び出さない。

バックエンドはDBにタスクを登録し、各WorkerはDBから実行待ちタスクを取得する。これにより、Webリクエストと長時間処理を分離する。Rails移行後も、Workerが利用するテーブル構造、カラム、制約、状態値を変更する場合は、RailsとWorkerの双方で整合性を確認する。

### 6.5 バージョン方針

具体的なバージョンは、環境構築時に安定版を確認して決定する。

| 技術 | バージョン方針 |
|---|---|
| Ruby | Railsの対応状況を確認して安定版を採用 |
| Ruby on Rails | API modeを前提とし、安定版を採用 |
| bcrypt | Ruby・Railsとの互換性を確認して安定版を採用 |
| rack-cors | Railsとの互換性を確認して安定版を採用 |
| pg | PostgreSQL・Ruby・Railsとの互換性を確認して安定版を採用 |
| Puma | Railsとの互換性を確認して安定版を採用 |
| Bundler | 採用するRubyと互換性のある安定版を採用 |

## 7. データベース技術

### 7.1 採用技術

- PostgreSQL

### 7.2 採用理由

PostgreSQL は、Webアプリケーションで広く利用されるRDBMSであり、RailsからはActive Recordと `pg` を介して利用できる。

本システムでは、シミュレーションタスク、ユーザー、結果メタデータ、ログ情報など、整合性を保って管理すべきデータが多いため、RDBMSを採用する。

### 7.3 DBの責務

DBは、以下の情報を管理する。

- ユーザー情報
- シミュレーションタスク情報
- シミュレーション実行状態
- シミュレーションパラメータ
- 入力ファイルのメタ情報
- 結果ファイルのメタ情報
- 失敗時ログのメタ情報
- 結果概要

大容量の入力ファイル・結果ファイルについては、原則としてDBに直接格納せず、ファイルとして保存し、DBにはパスやメタ情報を保存する。

## 8. Worker技術

### 8.1 採用技術

- Rust
- 既存のGPU QAシミュレータライブラリ

### 8.2 採用理由

Simulation WorkerとAnalysis WorkerはRust製の常駐アプリケーションとして実装する。Simulation Workerは、既存のRust製GPU QAシミュレータライブラリを利用してシミュレーションを実行する。

Rustを採用する理由は以下である。

- 既存のシミュレータ実装資産を活用できる。
- 長時間実行される処理を安全に扱いやすい。
- 型安全性により、実行時エラーの一部をコンパイル時に検出しやすい。
- GPU計算処理との連携を既存ライブラリ側で扱える。

### 8.3 Workerの責務

#### Simulation Worker

Simulation Worker は、以下を担当する。

- DBから実行待ちタスクを取得する。
- タスク状態を実行中に更新する。
- 入力ファイルを読み込む。
- GPU QAシミュレータライブラリを用いてシミュレーションを実行する。
- 実行進捗をDBに反映する。
- 成功時に結果ファイルと結果メタ情報を保存する。
- 失敗時にエラーログを保存する。
- タスク状態を分析待ちまたは失敗に更新する。

#### Analysis Worker

Analysis Worker は、以下を担当する。

- DBから分析待ちタスクと結果メタ情報を取得する。
- シミュレーション結果ファイルを読み込み、結果を分析する。
- 結果サマリーと確率上位状態をDBに保存する。
- 成功時にタスク状態を完了に更新する。
- 失敗時に分析エラーログを保存し、タスク状態を分析失敗に更新する。

### 8.4 Workerの実行方式

- 各Workerは独立した常駐アプリケーションとして実行する。
- 定期的にDBを確認し、対象状態のタスクがあれば取得する。
- 初期段階では、Worker種別ごとに単一プロセスによる順次実行を基本とする。
- 同一種別の複数Workerによる並列実行は、初期段階では対象外とする。

### 8.5 バージョン方針

| 技術 | バージョン方針 |
|---|---|
| Rust | 既存シミュレータライブラリおよび各Workerの実装と互換性のある安定版を採用 |

## 9. Webサーバー・リバースプロキシ

### 9.1 採用技術

- Nginx

### 9.2 採用理由

Nginx は、静的ファイル配信とリバースプロキシの両方に利用できる。

本番環境では、以下を担当する。

- ビルド済みフロントエンドの配信
- バックエンドAPIへのリバースプロキシ
- フロントエンドとバックエンドのオリジン統一
- 将来的なHTTPS化への対応

## 10. プロセス管理

### 10.1 採用技術

- systemd

### 10.2 採用理由

研究室サーバー上で、バックエンドAPIや各Workerを常駐プロセスとして管理するために systemd を利用する。

systemd を利用することで、以下を実現する。

- サーバー起動時の自動起動
- プロセス停止時の再起動
- ログ確認
- サービス単位での起動・停止・再起動

### 10.3 管理対象

初期段階では、以下を systemd 管理対象とする。

- Backend API（Puma）
- Simulation Worker
- Analysis Worker

Nginx と PostgreSQL は、それぞれ標準的なサービス管理方式に従う。

## 11. 開発環境方針

### 11.1 フロントエンド開発

- Vite 開発サーバーを利用する。
- ViteとRailsを別オリジンで起動し、`rack-cors` で開発環境のオリジンを許可する。
- 型定義を明確にし、APIレスポンスの構造をTypeScriptで管理する。

### 11.2 バックエンド開発

- BundlerによりRubyのgem依存関係を管理する。
- RailsのAPI modeを利用し、モデルとMigrationにはActive Recordを使用する。
- 開発用サーバーにはRailsからPumaを起動して利用する。
- APIレスポンス形式は共通仕様に従う。

### 11.3 Worker開発

- 既存のRust製GPU QAシミュレータライブラリを利用する。
- Simulation WorkerとAnalysis Workerは独立した常駐アプリケーションとして実装する。
- DB接続処理とシミュレーション／分析処理を分離して実装する。
- 進捗更新処理は、シミュレーション本体の性能を大きく阻害しない設計とする。

## 12. 今後検討する技術項目

以下は、今後の設計段階で詳細を決定する。

- PostgreSQL の具体的なバージョン
- Rust側DB操作ライブラリ
- ファイル保存ディレクトリ構成
- 本番環境でのHTTPS対応
- メール通知の送信方式
- ログ保存方式
- バックアップ方針
- 複数Worker対応の有無

## 13. 関連文書

- QASim Lab 要件定義
- QASim Lab 共通仕様
- QASim Lab ユーザーアプリケーション仕様書
- QASim Lab シミュレーションタスクアプリケーション仕様書
- QASim Lab シミュレーション実行アプリケーション仕様書
- QASim Lab シミュレーション結果分析アプリケーション仕様書
