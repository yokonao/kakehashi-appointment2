# kakehashi-appointment2
予約システム

## 機能一覧

- 患者様向け
  - 予約枠の一覧
  - 予約の作成
  - 予約完了メール
- 医師向け
  - 予約の一覧
  - 予約の削除
  - 予約枠の追加・削除
  - 予約完了メール配信
- システム
  - 予約枠の自動作成（daily）

## 関連外部サービス

- Heroku
  - アプリのホスティング
  - カスタムドメイン（`kakehashi-appointment`）
- Sendgrid
  - メール送信

## Renewal　Design

- プラットフォーム
- フロントエンド
- バックエンド
- データベース

## デプロイ
```
git push heroku main
```

## Tasks
一日に一度実行すべきタスク
```
bin/rake menu:daily # 不要な予約枠を削除しつつ30日後の予約枠を作成する
```

予約枠を作成
```
bin/rake menu:prepare[1,30] # 一ヶ月間の予約枠
bin/rake menu:prepare[30,30] # 30日後の予約枠
```

当日以前前且つ予約が取られていない枠を削除する
```
bin/rake menu:purge
```
