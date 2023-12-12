**学内就職支援サイト**

## プロジェクトの説明

大学で実際に使用する就職支援サイトを作成しました。
2024年からの運用に向けて現在開発中のデモサイトを公開しています。

※デモサイトは実際に運用されるものの機能縮小版となっています。

##  使い方
以下のURLで使用できます。
https://pbldemo-katsuki0908.vercel.app/login

ログイン時はユーザー名を入力してください。パスワードは必要ありません。
**管理者用:admin**
**学生用:TD232000**

デモ版のためエラーが発生することがあります。
以下のエラーが確認されています。

***ログイン時にトップページに遷移しないことがあります。***
正しいユーザー名でログインボタンを押したにも関わらずページが遷移しない場合は、以下の方法を試してみてください

・ページを戻って再度ユーザー名を入力してログインボタンを押してみてください
・ログインボタンを押した後https://pbldemo-katsuki0908.vercel.app/top　と直接URLを入力ください。


## 背景

本プロジェクトは以下の背景のもとチームでの開発を行いました。

・学内の就職支援担当教員の作業負荷を軽減するため
・現在使用されている学内の就職支援サイトの知名度と利用率が低いので、新たな支援サイトを作成し学生の就職を支援するため


## プロジェクトの機能詳細

作成したサイトは学生と管理者で機能に違いがあります。
使用言語:Typescript
使用フレームワーク:Next.js　Prisma
以下各ページの説明を記載します

#   ログインページ
学籍番号とパスワードを入力しログインするページです。
実際の運用では**学内の認証システム**を利用しますが、本デモサイトではパスワード認証を外しています。

#   トップページ
アカウントに関係なくログイン後に遷移するページです。
サイドバーから他のページに遷移することが出来ます。
またインターン情報や就職に関係ある情報がお知らせとして記載されています。

#   求人一覧ページ
求人情報を閲覧できるページです。
各会社名をクリックすることで、応募形態や詳細情報を受け取ることが出来ます。

#   マイページ
プロフィールとマイキャリアを閲覧することができるページです。

プロフィールはデータベースの整合性を高めるために基本的には学生側からの編集はできないようになっています。

「マイキャリア」とは自分の就職活動の履歴のことです。
ここでエントリーシートを出した企業や面接中の企業などを登録します。

登録したマイキャリアは教員(管理者)からも閲覧ができ、学生と教員間の就職状況の共有ができるようになっています。

#   キャリア活動編集ページ
前述したマイキャリアを編集することが出来るページです。
学生は会社名・活動日・活動内容を記載し登録します。
このとき会社名が選択肢にない場合は「その他」を選択し、備考の欄に会社名を記載します。

#   ユーザー管理ページ
（デモサイトにはフォーマットだけの実装）
*管理者のみがアクセスできます。*

学生の一覧を閲覧できるページです。ここで選択した学生のプロフィールとマイキャリアを閲覧できます。
学生の就活の状況を教員側が把握するために作成しました。

#   お知らせ編集ページ
(デモサイトには未実装)
*管理者のみがアクセスできます。*

トップページで表示するお知らせの追加や編集を行うページです。

#   求人票編集ページ
*管理者のみがアクセスできます。*

求人票ページで表示する求人情報の追加や編集を行うページです。

#   各種設定ページ
（デモサイトにはフォーマットだけの実装）
*管理者のみがアクセスできます。*

管理者が各ページの選択肢の追加や学生情報のインポートを行うページです。

学生がキャリアを追加するときに選択できる会社やキャリア活動の選択肢を追加できます。
また学生が選択肢にない会社名を「その他」として追加した場合、このページから会社名を新規追加します。（通知機能実装予定）

学生情報は毎年追加されるので、エクセルデータを使用しての一括インポートをできるようにしています。

#   その他の機能
・ログ機能
学内で使用するにあたり、各種ログを１年間分は保存する必要があるため、APIへの通信履歴を記録しています。
またレベルに応じたログの出力もできるようにしています。

・PC・スマホ対応
学生の多くはスマートフォンからのアクセスがあると予想されるため、ページは全てPC・スマホの両方からページを閲覧できます。


##  工夫した点
今回のプロジェクトは実際のシステム開発の流れである要件定義→設計→テスト→リリースの手順を踏んでいます。
開発するうえで以下の点を工夫して作成しました。

・

