# kakehashi-appointment2
予約システム

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
