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

```
asdf install

bundle install
yarn install
```

setup database

```
bin/rails db:setup db:migrate
```

setup enviroment variables
```
export CUSTOM_DOMAIN_ADDRESS='...' # your mail address
export DOCTOR_ADDRESS='...' # your mail address
```

launch servers

```
bin/rails s
yarn watch --build
```

### Install pg gem (Mac)

pg gem が入らない時は --with-pg-config オプションを渡す

```
brew install libpq
gem install pg -v '1.2.3' -- --with-pg-config=$(brew --prefix libpq)/bin/pg_config
```

NOTE: -v オプションは現在の Gemfile.lock に合わせて変えてください

## Testing

```
# Run unit tests
make test

# Run system tests (using selenium)
make test.system

# Run all tests
# If this passes, you can deploy
make test.acceptance
```

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
