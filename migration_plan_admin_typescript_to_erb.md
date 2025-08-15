# 管理者向け画面 TypeScript/Vite → ERB/Turbo 移行計画

## 1. 現状の構成

### 技術スタック
- **フロントエンド**: React 19 + TypeScript + Vite
- **スタイル**: Material-UI (@mui) + styled-components
- **ルーティング**: React Router (クライアントサイドルーティング)
- **状態管理**: React Context API (AdminContext)
- **API通信**: Axios経由でJSON API呼び出し

### 画面構成
1. **予約枠管理画面** (`/admin/menus`)
   - 週単位カレンダー表示
   - 予約枠の作成・削除機能
   - 予約済み枠の詳細表示

2. **予約一覧画面** (`/admin/appointments`)
   - データグリッドによる一覧表示
   - 予約詳細表示
   - 予約削除機能

### ファイル構成
```
front/
├── packs/
│   └── admin.tsx (エントリーポイント)
└── features/admin/
    ├── api/
    │   └── AdminApiClient.ts
    ├── components/
    │   ├── AdminDrawer.tsx (サイドバー)
    │   ├── AdminHeader.tsx (ヘッダー)
    │   ├── WeeklyMenu.tsx (予約枠管理)
    │   ├── Appointments.tsx (予約一覧)
    │   └── 各種ダイアログコンポーネント
    ├── hooks/
    │   └── useAdminContext.tsx (状態管理)
    └── Routes.tsx
```

## 2. 移行後の構成案

### 技術スタック
- **フロントエンド**: ERB + Turbo + Stimulus
- **スタイル**: Tailwind CSS (既存の設定を活用)
- **ルーティング**: Rails サーバーサイドルーティング
- **状態管理**: Turbo Streams + Stimulus
- **API通信**: Turbo Frames/Streams (必要に応じてfetch API)

### ディレクトリ構成
```
app/
├── controllers/admin/
│   ├── menus_controller.rb
│   ├── appointments_controller.rb
│   └── base_controller.rb
├── views/
│   ├── admin/
│   │   ├── menus/
│   │   │   ├── index.html.erb
│   │   │   ├── _menu_card.html.erb
│   │   │   └── _weekly_calendar.html.erb
│   │   └── appointments/
│   │       ├── index.html.erb
│   │       ├── _appointment_row.html.erb
│   │       └── show.html.erb
│   └── layouts/
│       └── admin.html.erb
└── javascript/
    └── controllers/
        ├── admin_menu_controller.js
        ├── admin_appointment_controller.js
        └── dialog_controller.js
```

## 3. 移行手順

### Phase 1: 基盤整備 (1-2日)
1. [ ] 管理者用レイアウトファイル作成 (`app/views/layouts/admin.html.erb`)
2. [ ] 管理者用基底コントローラー作成 (`app/controllers/admin/base_controller.rb`)
3. [ ] Turbo/Stimulus の設定確認と必要な追加設定
4. [ ] Tailwind CSS の管理画面用スタイル追加

### Phase 2: 予約枠管理画面の移行 (3-4日)
1. [ ] `Admin::MenusController` を作成
   - index, create, destroy, destroy_all アクションをHTML対応に
2. [ ] ビューファイル作成
   - `index.html.erb`: メインページ
   - `_weekly_calendar.html.erb`: 週カレンダー部分テンプレート
   - `_menu_card.html.erb`: 各予約枠カード
3. [ ] Stimulus コントローラー作成
   - カレンダー操作 (週移動)
   - 予約枠作成・削除の非同期処理
   - モーダルダイアログ制御
4. [ ] Turbo Streams 対応
   - 予約枠の動的追加・削除
   - リアルタイム更新

### Phase 3: 予約一覧画面の移行 (2-3日)
1. [ ] `Admin::AppointmentsController` を作成
   - index, show, destroy アクションをHTML対応に
2. [ ] ビューファイル作成
   - `index.html.erb`: 一覧ページ
   - `_appointment_row.html.erb`: 各行の部分テンプレート
   - `show.html.erb`: 詳細ページ
3. [ ] Stimulus コントローラー作成
   - ソート・フィルタリング機能
   - 削除確認ダイアログ
4. [ ] ページネーション実装 (kaminari or pagy)

### Phase 4: 共通機能の移行 (2日)
1. [ ] ナビゲーション (ヘッダー・サイドバー) の ERB 化
2. [ ] 通知機能 (flash messages) の実装
3. [ ] ローディング表示の実装
4. [ ] エラーハンドリングの統一

### Phase 5: テストと調整 (2-3日)
1. [ ] システムテストの作成・更新
2. [ ] JavaScript 単体テストの削除・移行
3. [ ] パフォーマンステスト
4. [ ] UI/UX の調整

### Phase 6: 切り替えとクリーンアップ (1日)
1. [ ] ルーティングの切り替え
2. [ ] 旧TypeScriptコードの削除
3. [ ] 不要な npm パッケージの削除
4. [ ] ドキュメント更新

## 4. 考慮事項

### メリット
- **シンプルな構成**: Rails標準の機能で実装されるため、メンテナンスが容易
- **ビルド時間短縮**: Viteビルドが不要になり、デプロイ時間が短縮
- **サーバーサイドレンダリング**: SEOは不要だが、初期表示が高速化
- **統一感**: 患者向け画面も将来的に同様の構成に移行可能

### デメリット・課題
- **インタラクティブ性**: Material-UIのような高度なUIコンポーネントの再実装が必要
- **開発効率**: TypeScriptの型安全性を失う
- **既存機能の再実装**: すべての機能を書き直す必要がある

### 段階的移行の選択肢
1. **並行運用**: 新旧両方の実装を一時的に共存させる
2. **機能単位での移行**: 画面ごとに段階的に切り替える
3. **新規機能から**: 新しく追加する機能からERBで実装

## 5. 必要なGemの追加

```ruby
# Gemfile に追加が必要なもの
gem "turbo-rails"      # 既にインストール済み
gem "stimulus-rails"   # 既にインストール済み
gem "kaminari"        # ページネーション用 (または pagy)
gem "view_component"  # コンポーネント指向のビュー (オプション)
```

## 6. 推定工期

- **最小実装**: 10-12営業日
- **完全移行**: 15-18営業日
- **テスト・調整込み**: 20営業日

## 7. リスクと対策

### リスク
1. **機能の抜け漏れ**: 複雑な状態管理ロジックの見落とし
2. **パフォーマンス低下**: クライアントサイドレンダリングからの移行による体感速度の低下
3. **ユーザビリティ低下**: UIライブラリの機能を再実装する際の品質

### 対策
1. **詳細な機能一覧作成**: 移行前に全機能を文書化
2. **Turbo/Stimulusの活用**: 適切な非同期処理でUXを維持
3. **段階的リリース**: 機能ごとにユーザーテストを実施

## 8. 次のステップ

1. この計画のレビューと承認
2. Phase 1 の基盤整備から開始
3. 1画面ずつ段階的に実装・テスト
4. 並行運用期間を設けて安定性を確認
5. 完全切り替え