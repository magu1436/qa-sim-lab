import { AxiosError } from "axios";
import InvalidDateFormatError from "../error/order/InvalidDateFormatError";
import InvalidOrderError from "../error/order/InvalidOrderError";
import InvalidProblemNameError from "../error/order/InvalidProblemNameError";
import InvalidRangeError from "../error/order/InvalidRangeError";
import InvalidStatusError from "../error/order/InvalidStatusError";
import type { TableData, TaskRequest, TaskRow } from "../type/table";
import type { TableTaskRowDataApi } from "../type/api";

const testData: TableTaskRowDataApi[] = [
  {
    id: 1,
    user: {
      student_id: "B1234567",
      name: "山田太郎",
    },
    created_at: "2026-05-07T18:09:32",
    status: "QUEUED",
    ratio: 0,
    problem_name: "整数分割問題",
    name: "基準実験 tau=20",
    memo: "先行実験と同一条件での再実行",
  },
  {
    id: 2,
    user: {
      student_id: "B2345678",
      name: "佐藤花子",
    },
    created_at: "2026-05-08T09:15:10",
    status: "PREPARING",
    ratio: 0,
    problem_name: "巡回セールスマン問題",
    name: "都市数10 サンプル",
    memo: "小規模データで動作確認",
  },
  {
    id: 3,
    user: {
      student_id: "B3456789",
      name: "鈴木一郎",
    },
    created_at: "2026-05-08T13:42:55",
    status: "RUNNING",
    ratio: 37,
    problem_name: "3人囚人のジレンマ",
    name: "WARP版比較用",
    memo: "NORMALメソッドとの実行時間比較",
  },
  {
    id: 4,
    user: {
      student_id: "B4567890",
      name: "高橋美咲",
    },
    created_at: "2026-05-09T10:03:21",
    status: "COMPLETED",
    ratio: 100,
    problem_name: "最大カット問題",
    name: "グラフA 初回実行",
    memo: "疎グラフに対する基本検証",
  },
  {
    id: 5,
    user: {
      student_id: "B5678901",
      name: "田中健太",
    },
    created_at: "2026-05-09T16:28:44",
    status: "FAILED",
    ratio: 12,
    problem_name: "整数分割問題",
    name: "dt=0.0005 検証",
    memo: "入力ファイルの形式確認が必要",
  },
  {
    id: 6,
    user: {
      student_id: "B6789012",
      name: "伊藤葵",
    },
    created_at: "2026-05-10T11:11:09",
    status: "CANCELED",
    ratio: 0,
    problem_name: "ナップサック問題",
    name: "容量制約テスト",
    memo: "パラメータ修正のため一時キャンセル",
  },
  {
    id: 7,
    user: {
      student_id: "B7890123",
      name: "渡辺翔太",
    },
    created_at: "2026-05-10T19:30:00",
    status: "ANALYZING",
    ratio: 100,
    problem_name: "グラフ彩色問題",
    name: "4色制約 実験1",
    memo: "シミュレーション完了、分析待ち",
  },
  {
    id: 8,
    user: {
      student_id: "B8901234",
      name: "中村優奈",
    },
    created_at: "2026-05-11T08:45:17",
    status: "FAILED",
    ratio: 100,
    problem_name: "巡回セールスマン問題",
    name: "都市数16 高負荷実験",
    memo: "結果ファイルの分析処理で失敗",
  },
  {
    id: 9,
    user: {
      student_id: "B9012345",
      name: "小林亮",
    },
    created_at: "2026-05-11T14:20:36",
    status: "QUEUED",
    ratio: 0,
    problem_name: "スピングラス問題",
    name: "乱数シード001",
    memo: "ランダムインスタンスの初回実行",
  },
  {
    id: 10,
    user: {
      student_id: "B0123456",
      name: "加藤結衣",
    },
    created_at: "2026-05-12T12:05:48",
    status: "COMPLETED",
    ratio: 100,
    problem_name: "整数分割問題",
    name: "b0=10 tau=30",
    memo: "tauを長めにした場合の確率集中を確認",
  },
  {
    id: 11,
    user: {
      student_id: "B1122334",
      name: "吉田拓海",
    },
    created_at: "2026-05-12T18:22:13",
    status: "RUNNING",
    ratio: 64,
    problem_name: "最大独立集合問題",
    name: "頂点数20",
    memo: "中規模グラフでの動作確認",
  },
  {
    id: 12,
    user: {
      student_id: "B2233445",
      name: "山本奈々",
    },
    created_at: "2026-05-13T09:40:02",
    status: "QUEUED",
    ratio: 0,
    problem_name: "ナップサック問題",
    name: "価値重視ケース",
    memo: "重み制約を緩くしたケース",
  },
  {
    id: 13,
    user: {
      student_id: "B3344556",
      name: "松本大輔",
    },
    created_at: "2026-05-13T15:17:29",
    status: "PREPARING",
    ratio: 0,
    problem_name: "3人囚人のジレンマ",
    name: "QUADRATIC_WARP検証",
    memo: "二次項を含む時間発展メソッドの確認",
  },
  {
    id: 14,
    user: {
      student_id: "B4455667",
      name: "井上真央",
    },
    created_at: "2026-05-14T10:55:41",
    status: "COMPLETED",
    ratio: 100,
    problem_name: "グラフ彩色問題",
    name: "小規模 完了サンプル",
    memo: "UI表示確認用の完了データ",
  },
  {
    id: 15,
    user: {
      student_id: "B5566778",
      name: "木村隼人",
    },
    created_at: "2026-05-14T20:08:16",
    status: "FAILED",
    ratio: 0,
    problem_name: "最大カット問題",
    name: "不正入力テスト",
    memo: "入力ファイルサイズ不一致の想定",
  },
  {
    id: 16,
    user: {
      student_id: "B6677889",
      name: "林さくら",
    },
    created_at: "2026-05-15T07:33:58",
    status: "CANCELED",
    ratio: 0,
    problem_name: "整数分割問題",
    name: "条件修正予定",
    memo: "dtとtauを見直してから再キュー予定",
  },
  {
    id: 17,
    user: {
      student_id: "B7788990",
      name: "清水悠斗",
    },
    created_at: "2026-05-15T13:49:27",
    status: "ANALYZING",
    ratio: 100,
    problem_name: "スピングラス問題",
    name: "乱数シード002",
    memo: "結果分析中",
  },
  {
    id: 18,
    user: {
      student_id: "B8899001",
      name: "森田彩",
    },
    created_at: "2026-05-16T16:12:04",
    status: "QUEUED",
    ratio: 0,
    problem_name: "巡回セールスマン問題",
    name: "都市数12 比較用",
    memo: "都市数10の結果と比較予定",
  },
  {
    id: 19,
    user: {
      student_id: "B9900112",
      name: "池田蓮",
    },
    created_at: "2026-05-17T09:26:35",
    status: "COMPLETED",
    ratio: 100,
    problem_name: "最大独立集合問題",
    name: "頂点数16 完了",
    memo: "上位状態の集中度を確認済み",
  },
  {
    id: 20,
    user: {
      student_id: "B1011121",
      name: "藤原美月",
    },
    created_at: "2026-05-17T21:04:50",
    status: "QUEUED",
    ratio: 0,
    problem_name: "グラフ彩色問題",
    name: "制約変更テスト",
    memo: "制約条件を変更した再実行",
  },
];

const convertTask = (api: TableTaskRowDataApi): TaskRow => {
  return {
    ...api,
    user: {
      studentId: api.user.student_id,
      name: api.user.name,
    },
    createdAt: new Date(api.created_at),
    problemName: api.problem_name,
  };
};

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒

const order = async (input: TaskRequest): Promise<TableData> => {
  try {
    // TODO: order
    console.log("order: ", input);
    await sleep(1000);
    return {
      tasks: testData.map(convertTask),
      totalTasks: testData.length * 100,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.data.code) {
        case "INVALID_RANGE":
          throw new InvalidRangeError("elem_start or elem_end is invalid", "INVALID_RANGE", 400);
        case "INVALID_ORDER":
          throw new InvalidOrderError("Order must be ASC or DESC", "INVALID_ORDER", 400);
        case "INVALID_DATE_FORMAT":
          throw new InvalidDateFormatError("Date format is invalid", "INVALID_DATE_FORMAT", 400);
        case "INVALID_STATUS":
          throw new InvalidStatusError("Status is invalid", "INVALID_STATUS", 400);
        case "INVALID_PROBLEM_NAME":
          throw new InvalidProblemNameError(
            "Problem name search condition is too long",
            "INVALID_PROBLEM_NAME",
            400,
          );
      }
    }
    throw error;
  }
};

export default order;
