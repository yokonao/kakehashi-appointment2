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

## 開発環境構築

本プロジェクトでは開発環境を構成するツールとして [mise](https://github.com/jdx/mise) を利用しています。
公式ドキュメントに従いあらかじめインストールしておいてください。

まずは Ruby 等のラインタイムをインストールします。

```
mise install
```

```
bundle install
```

setup database

```
bin/rails db:setup db:migrate
```

launch servers

```
bin/rails s
bin/rails tailwindcss:watch
```

### Install pg gem (Mac)

pg gem が入らない時は --with-pg-config オプションを渡す

```
brew install libpq
gem install pg -v '1.6.1' -- --with-pg-config=$(brew --prefix libpq)/bin/pg_config
```

NOTE: -v オプションは現在の Gemfile.lock に合わせて変えてください

## Testing

```
# Run unit tests
mise test.unit

# Run system tests (using selenium)
mise test.system

# Run all tests
# If this passes, you can deploy
mise test.acceptance
```

## デプロイ

```
mise deploy
```

## Tasks

一日に一度実行すべきタスク

```
bin/rake menu:daily # 不要な予約枠を削除しつつ30日後の予約枠を作成する
```

予約枠を作成

```
bin/rake 'menu:prepare[1,30]' # 一ヶ月間の予約枠
bin/rake 'menu:prepare[30,30]' # 30日後の予約枠
```

当日以前前且つ予約が取られていない枠を削除する

```
bin/rake menu:purge
```

## 管理者ユーザーの作成

rails console にて Administrator のレコードを作成する。

```ruby
irb(main):001:0> Administrator.create!(email: "your-address@example.com", password: 'testtest')
```

## production 動作確認

```
SECRET_KEY_BASE=hogehoge RAILS_ENV=production bin/rake assets:precompile
DATABASE_URL=postgresql://postgresql:postgresql@localhost:5432/kakehashi-appointment2_development RAILS_SERVE_STATIC_FILES=1 SECRET_KEY_BASE=hogehoge RAILS_ENV=production bin/rails s -p 3200
```

## Update Dependencies

### Ruby

以下を更新する：

- mise.toml
- Gemfile の ruby directive

### gem

```
mise update-gem
```

## Heroku

production 環境のアプリケーションは Heroku でホスティングしています。

### Add-on

https://dashboard.heroku.com/apps/kakehashi-appointment/resources

以下のアドオンを利用しています。

- [Heroku Posgres](https://data.heroku.com/datastores/bd2b8c3a-2a88-462b-a192-48e453359724)
  - メインデータストア
- [Heroku Schedule](https://dashboard.heroku.com/apps/kakehashi-appointment/scheduler)
  - 定期的な予約枠の作成・削除
- Twilio Sendgrid
  - 何に使っているのか不明、要らないかも

### Config Vars

[Heroku Dashboard](https://dashboard.heroku.com/apps/kakehashi-appointment/settings) からアプリケーションの環境変数を設定できる。

- CUSTOM_DOMAIN_ADDRESS
  - メール配信の送信主となるメールアドレス
- DATABASE_URL
  - データベースの接続先
- DEVELOPER_ADDRESS
  - 開発者向けメールの配信先
- DOCTOR_ADDRESS
  - 管理者向けメールの配信先
- LANG
  - en_US.UTF-8 になっているが理由は不明、日本語でもいいかも
- RACK_ENV
- RAILS_ENV
- RAILS_LOG_TO_STDOUT
- RAILS_SERVE_STATIC_FILES
  - これは消せる
- SECRET_KEY_BASE
  - rails credeintails の encrpyt / decrypt に利用する固定値
  - 基本的に変えてはいけない
- SENDGRID_API_KEY
- SENDGRID_PASSWORD
  - なぜ設定されているのか不明、実は不要かも
- SENDGRID_USERNAME
  - なぜ設定されているのか不明、実は不要かも
- TZ
  - Asia/Tokyo

### Connect console

```
heroku run -a kakehashi-appointment bin/rails console
```

### Tail logs

```
heroku logs --tail -a kakehashi-appointment
```
