# rustyworks.jp — 公開用リポジトリ

このフォルダは **GitHub Pages で rustyworks.jp として公開されている本体** です。
`Rusty1m/rustyworks` のクリーンなクローンで、常にリモートと一致した状態を保ちます。

## フォルダの役割分担

| フォルダ | 役割 | git |
|---|---|---|
| `~/rustyworks-site/`（ここ） | **公開用。** ここから push すると本番に反映される | 管理下 |
| `~/git_HomePage用/` | **一時置き場。** 作りかけ・大量の画像素材・書き出し前のもの | 管理外 |

公開したいものができたら、一時置き場からこのフォルダへコピーして push します。
一時置き場は git 管理外なので、**うっかり全部コミットして本番のファイルを消す事故が起きません。**

## 触ってはいけないファイル

- **`CNAME`** — 独自ドメイン `rustyworks.jp` の設定。消すとドメインで開けなくなります。

## 公開の流れ

1. このフォルダで編集（または一時置き場からコピー）
2. `git status` で変更内容を確認（**意図しない削除がないか必ず見る**）
3. 必要なファイルだけ `git add`
4. コミットして `git push origin main`
5. 数十秒で `rustyworks.jp` に反映される

## 認証

HTTPS + キーチェーン。Personal Access Token（fine-grained・`Contents: Read and write`）を使用。
**有効期限: 2026-10-24** — 切れたら GitHub で作り直してください。

## 収録ページ

| 製品 | ページ |
|---|---|
| Recoup | `recoup.html` / `recoup_manual.html` / `recoup_privacy.html` |
| ShelfNavigator | `shelfnavigator.html` / `_manual` / `_privacy` |
| Kuro | `kuro.html` / `kuro_manual.html` / `kuro_privacy.html` |
| 不満ノート（FumanNote） | `fumannote.html` / `fumannote_manual.html` / `fumannote_privacy.html` |
| Plain Video Saver | `pvs.html` / `pvs_privacy.html` |
| UADB | `UADB_manual.html` / `uadb_privacy.html` |
| オートダビング構文（Web アプリ） | `autodub/index.html` / `autodub/notes.html`（解説記事） |
| トップ | `index.html` |
| サイト共通 | `works.html`（作品一覧） / `contact.html`（お問い合わせ・noindex） / `site_privacy.html` |

## ページを1枚追加するときの決まりごと

既存のページはすべて下の形になっています。**忘れても表示は壊れないが、
後から直しても取り返しがつきにくいもの**を先に並べます。

### 1. OGP を入れる

SNS やチャットに貼られたときに出るカードの中身です。**後から足しても、
各サービスが一度取得したキャッシュは当分そのまま**なので、公開前に入れます。

| | |
|---|---|
| 入れるページ | 製品ページ、Web アプリ、トップ、WORKS、お問い合わせ |
| 入れないページ | 取説・各アプリのプライバシーポリシー（人に貼られる前提がないため） |

`index.html` の7〜20行目がそのまま雛形です。

```html
<meta name="description" content="…">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RustyWorks">
<meta property="og:locale" content="ja_JP">
<meta property="og:url" content="https://rustyworks.jp/xxx.html">
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="https://rustyworks.jp/assets/og/xxx-og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="…">
<meta name="twitter:description" content="…">
<meta name="twitter:image" content="https://rustyworks.jp/assets/og/xxx-og.jpg">
```

- **`og:url` と `og:image` は絶対 URL で書く。** 相対パスだと拾われません
- 製品ごとの絵が無いページ（トップ・WORKS・お問い合わせ）は、共通の
  `rustyworks-og.jpg` を指します。専用の絵を描いたら差し替える
- 検索に出したくないページには `<meta name="robots" content="noindex">` を足す
  （`contact.html` がそうしています）。**OGP は noindex でも効きます**

### 2. 画像を3か所に用意する

トップと WORKS の枠は **`aspect-ratio:1200/630` の帯**で、絵は `object-fit:contain`
で中に収めています。**だから実寸がバラついても一覧の高さは揃うし、絵が切り取られる
こともありません。** そのかわり、**比率が 1200:630 からずれた分だけ帯の余白が出ます。**

| 置き場 | 使う場所 | 目安 | 形式 |
|---|---|---|---|
| `assets/og/<名前>-og.jpg` | 共有時のカード | **1200×630 ちょうど**（SNS 側が決める） | jpg |
| `assets/cards/<名前>.webp` | トップの作品カード・WORKS 一覧 | 720×378（＝1200:630） | webp |
| `assets/icons/<名前>.png` | 専用の絵が無いものの代用・ファビコン | 160×160 | png |

- **揃えるのは画素数ではなく比率です。** 720×378 はちょうど 1200:630 なので余白が出ません
- **比率がずれる絵を使うときは、帯の色を絵の地に合わせます。** そうすれば余白は見えません。
  実際 `fumannote.webp` は 800×382（比率 2.09）ですが、この指定で成立しています

```html
<!-- index.html — トップの作品カード。比率がずれるので帯の色を指定している -->
<a class="work" href="fumannote.html">
  <div class="work-art" style="--art-bg:#f6f3f0;"><img src="assets/cards/fumannote.webp" alt="" loading="lazy" width="800" height="382"></div>
  <div class="work-foot">
    <span class="work-name">不満ノート</span>
    <span class="dot released" title="リリース済み" aria-label="リリース済み"></span>
  </div>
</a>

<!-- works.html — 専用の絵がまだ無いものは placeholder にしてアイコンを中央に置く -->
<div class="item-art placeholder"><img src="assets/icons/xxx.png" alt="" loading="lazy" width="160" height="160"></div>
```

`width` と `height` は実寸をそのまま書きます（枠が比率を持っているので、
書かなくても行はずれません）。`alt` が空なのは、すぐ隣に同じ名前が
テキストで出ているからです。

### 3. 一覧に登録する

ページを作っただけでは、どこからも辿れません。**両方に足します。**

- `index.html` の作品カード（横送り）
- `works.html` の一覧（説明文・状態バッジ・取説やプライバシーへのリンク）

### 4. 問い合わせの対象に足す（**2か所あります**）

新しい製品を出したら、お問い合わせフォームの「対象」に足します。
**サイト側とクラウドフレア側の両方を直さないと、黙って取りこぼします。**

| 直す場所 | 何を |
|---|---|
| `contact.html` の `<select id="product">` | `<option value="DocPane">DocPane</option>` を1行 |
| `~/git_HomePage用/contact-worker/worker.js` の `PRODUCTS` | 同じ文字列を配列に追加 |

**片方だけだと、送信は成功して 200 が返るのに、届いたメールでは
「指定なし」になります。** Worker は知らない値を弾かずに寄せる作りだからです。
送った人にも受け取った側にも、失敗したことが分かりません。

> `worker.js` はこのリポジトリにはありません。**一時置き場の
> `~/git_HomePage用/contact-worker/`** にあります。受け口の設計と
> デプロイ手順は、そこの README が正典です。

**`worker.js` は直しただけでは効きません。上げるまで反映されません。**

```bash
cd ~/git_HomePage用/contact-worker && npx wrangler deploy
```

`option` の `value` と `PRODUCTS` の文字列は**完全一致**させます。表示名と
値を変えている項目があるので注意（`UADB / UADB Lite` は `value="UADB"`、
`このサイト` は `value="サイト"`）。

### 5. Latest Updates に1行足す

トップの更新履歴です。**新しいものが一番上**で、日付は降順に並べます。

```html
<a class="update" href="docpane/">
  <time datetime="2026-08-14">2026.08.14</time>
  <span class="badge news">NEWS</span>
  <span class="update-title" data-ja="…" data-en="…">…</span>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 5 16 12 9 19"/></svg>
</a>
```

| バッジ | 使いどころ |
|---|---|
| `news` | 新しく出したもの・公開したもの |
| `update` | 既にあるものの更新 |
| `lab` | 実験的なもの、解説記事 |

`<time>` は `datetime` 属性と表示の両方を書きます（`2026-08-14` と `2026.08.14`）。
`href` は、その話題の行き先へ。**日本語だけでなく `data-en` も書きます。**

### 6. 全ページ共通で入れるもの

| | |
|---|---|
| `<meta name="viewport" …>` | 無いとスマホで極小表示になります |
| 配色 | ライトテーマの値に合わせる。`--bg` `--panel` `--line` `--text` `--muted` `--accent` |
| 日英切替 | 切り替えたい要素に `data-ja` / `data-en`、placeholder は `data-ph-ja` / `data-ph-en` |
| 解析タグ | `</body>` の直前に Cloudflare Web Analytics のタグ（トークンは全ページ共通） |
| フッター | トップへ戻る導線と `site_privacy.html` へのリンク |

### 7. 公開したあとに見る

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://rustyworks.jp/xxx.html
curl -s -o /dev/null -w '%{http_code}\n' https://rustyworks.jp/assets/og/xxx-og.jpg
```

どちらも `200` であること。**`og:image` が 404 だと、カードは画像なしで出ます。**
一覧からリンクが繋がっているかも合わせて確認します。

## Web アプリについて

**Web アプリは1つにつき1フォルダ**にして、`index.html` を置きます。
URL が `rustyworks.jp/autodub/` の形になり、拡張子が出ません。
共有される前提のものなので、URL の見た目と、後からデータや画像を
足せる余地を優先しています。

| | |
|---|---|
| 実体 | `autodub/index.html`（1ファイル完結・外部依存なし・ビルド不要） |
| OGP画像 | `assets/og/autodub-og.jpg`（1200×630） |
| アイコン | `autodub/icon.png`（ファビコン用・相対参照）と `assets/icons/autodub.png`（トップのカード用）の2か所 |
| 旧URL | `autodub.html` は転送用に残置。**消さないこと** |
| 版の表記 | フッター右下の `.ver`。**ビルドが無いので手で上げる。** GitHub Pages は HTML に10分のキャッシュを付けるため、手元だけ古いまま見えることがある。そのときここを見れば判別できる |

開発は `~/オートダビング構文/` で行い、そこからコピーして公開します。
コピー時に足すのは `<title>` 周りの OGP メタだけで、本体には手を入れません。

> `autodub.html`（ルート直下）は、フォルダ化する前に公開していた URL への
> 転送ページです。既に共有されたリンクを死なせないために置いてあります。
