# Laravel Mix Boilerplate for WordPress

## 使用方法

`foobar-japan` というテーマの作成を例として説明します。  
`foobar-japan` の箇所を、お好きなテーマ名に置き換えて読み進めてください。  

### 必要環境
- Node.js >= 12.13.0（nodeenv, nodebrew などの利用が望ましい）
- Docker

### 準備（テーマ名変更）

1. `wp-content/themes/input-theme-name/style.css` を開き、コメントを変更してください。
```
Theme Name: FooBar Japan
Description: FooBar Japan Corporate site
```

2. `package.json` を開き、各種プロパティを変更してください。
```
"name": "foobar-japan",
"description": "FooBar Japan Corporate site",
```

3. `.env` を開き、`MIX_SRC_RELATIVE_PATH`, `MIX_DIST_RELATIVE_PATH` に含まれるテーマ名を変更してください
```
MIX_SRC_RELATIVE_PATH=resources/themes/foobar-japan
MIX_DIST_RELATIVE_PATH=wp-content/themes/foobar-japan
```

4. テーマディレクトリの名前を変更してください。
```
$ mv resources/themes/input-theme-name resources/themes/foobar-japan
$ mv wp-content/themes/input-theme-name wp-content/themes/foobar-japan
```

### 起動

1. お好みの方法で WordPress を構築します。Docker, XAMPP, Local By Flywheel など。

2. シンボリックリンクを使用し、Laravel Mix Boilerplate のテーマディレクトリを、1で構築された WordPress から参照します。
```
$ ln -s wp-content/themes/foobar-japan /path/to/wp/wp-content/themes/foobar-japan
```

3. 1で構築された WordPress の管理画面を開き、テーマを変更してください。
```
Twenty XXXXX -> FooBar Japan
```

4. Laravel Mix Boilerplate の `.env-sample` を複製し、名前を `.env` に変更してください。
```
$ cp .env-sample .env
```

5. 4で作成された `.env` を開き、WordPress の URL を `MIX_BROWSER_SYNC_PROXY` に設定します。
```
MIX_BROWSER_SYNC_PROXY=http://localhost:8000
```

6. 依存パッケージをインストールします。
```
$ npm i
```

7. 開発用コマンドを実行し、`http://localhost:3000` へアクセスすると、サンプルページが表示されます。
```
$ npm run dev
```

8. 本番環境へ反映する前には、本番用コマンドを実行してください。
```
$ npm run prod
```

## Usage

This doc takes the creation of a theme named `foobar-japan` as an example.  
Replace `foobar-japan` with your theme name.  

### At first (Update theme name)

1. Open `wp-content/themes/input-theme-name/style.css`, and update comments.
```
Theme Name: FooBar Japan
Description: FooBar Japan Corporate site
```

2. Open `package.json`, and update properties.
```
"name": "foobar-japan",
"description": "FooBar Japan Corporate site",
```

3. Open `.env`, update theme name in `MIX_SRC_RELATIVE_PATH` and `MIX_DIST_RELATIVE_PATH`.
```
MIX_SRC_RELATIVE_PATH=resources/themes/foobar-japan
MIX_DIST_RELATIVE_PATH=wp-content/themes/foobar-japan
```

4. Update names of theme directories.
```
$ mv resources/themes/input-theme-name resources/themes/foobar-japan
$ mv wp-content/themes/input-theme-name wp-content/themes/foobar-japan
```

### Run

1. Construct WordPress in your favorite way, e.g. Docker, XAMPP, and Local by Flywheel.

2. With symbolic link, refer theme directory in Laravel Mix Boilerplate, from theme directory in WordPress.
```
$ ln -s wp-content/themes/foobar-japan /path/to/wp/wp-content/themes/foobar-japan
```

3. Open admin page of WordPress, and switch theme.
```
Twenty XXXXX -> FooBar Japan
```

4. Duplicate `.env` as `.env-sample`.
```
$ cp .env-sample .env
```

5. Open `.env`, and set WordPress URL to `MIX_BROWSER_SYNC_PROXY`.
```
MIX_BROWSER_SYNC_PROXY=http://localhost:8000
```

6. Install dependencies.
```
$ npm i
```

7. Run command for development, then you can see sample page.
```
$ npm run dev
```

8. Before deploying, run command for production.
```
$ npm run prod
```
