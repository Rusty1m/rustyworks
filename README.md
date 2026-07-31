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
| Plain Video Saver | `pvs.html` / `pvs_privacy.html` |
| UADB | `UADB_manual.html` / `uadb_privacy.html` |
| オートダビング構文（Web アプリ） | `autodub/index.html` |
| トップ | `index.html` |

## Web アプリについて

**Web アプリは1つにつき1フォルダ**にして、`index.html` を置きます。
URL が `rustyworks.jp/autodub/` の形になり、拡張子が出ません。
共有される前提のものなので、URL の見た目と、後からデータや画像を
足せる余地を優先しています。

| | |
|---|---|
| 実体 | `autodub/index.html`（1ファイル完結・外部依存なし・ビルド不要） |
| OGP画像 | `assets/og/autodub-og.jpg`（1200×630） |
| 旧URL | `autodub.html` は転送用に残置。**消さないこと** |

開発は `~/オートダビング構文/` で行い、そこからコピーして公開します。
コピー時に足すのは `<title>` 周りの OGP メタだけで、本体には手を入れません。

> `autodub.html`（ルート直下）は、フォルダ化する前に公開していた URL への
> 転送ページです。既に共有されたリンクを死なせないために置いてあります。
