# kakehashi-appointment2
予約システム

## Tasks
二週間分の予約枠を作成
```
bin/rake menu:fortnight
```
当日以前前且つ予約が取られていない枠を削除する
```
bin/rake menu:purge
```
