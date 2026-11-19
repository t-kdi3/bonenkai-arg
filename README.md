# bonenkai-arg

## 企画者用リセット

- 端末内の課題進行・クリア状況・キーワード収集状況は、トップページのURLに `?debug=1` を付けて開き、「進行状況をリセット」を実行します。
- 全体ランキングは同じ画面の「全体ランキングのリセット」から実行できます。Apps Script のスクリプト プロパティ `RANKING_RESET_TOKEN` に32文字以上の認証キーが必要です。キーはソースコードやリポジトリに保存しないでください。
- ランキングAPIのApps Scriptソースは [`ranking-apps-script/Code.gs`](./ranking-apps-script/Code.gs) です。ランキングのデータ行を削除し、1行目の見出しは保持します。
