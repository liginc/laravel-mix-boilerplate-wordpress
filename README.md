# Laravel Mix Boilerplate WP版

## 使用法

### インストール

1. 好きな方法でWordPressを構築します。 Docker、XAMPP、Local By Flywheelなど。

2. シンボリックリンクを使用して、WordPressの`wp-content/themes/input-theme-name`から、このREADME.mdを含む`wp-content/themes/input-theme-name`を参照します。

3. 作成したWordPressの管理画面からテーマ`input-theme-name`を適用してください。

4. `.env-sample`をコピーして`.env`を作成し、`.env`を開き、WordPressのURLを`BROWSER_SYNC_PROXY`に設定します。
例:`http://localhost:8000`  `http://wordpress.test`

5. `npm i`と`npm run dev`を実行すると、サンプルページが `http://localhost:3000`に表示されます。

### 初期設定

1. `wp-content/themes/input-theme-name/style.css`を開いてコメントを編集してください。

2. `package.json`を開き、プロパティを編集します。`name`,`description`など。

3. `webpack.mix.js`を開き、テーマ名を変数`themeName`に設定します。

4. `resources/themes/input-theme-name`と`wp-content/themes/input-theme-name`の名前をあなたのテーマの名前に変更します。

---------

# Laravel Mix Boilerplate for WordPress

## Usage

### At first

1. Construct WordPress in your favorite way, e.g. Docker, XAMPP, and Local by Flywheel.

2. With symbolic link, reffer `wp-content/themes/input-theme-name` that contains this README.md, from `wp-content/themes/input-theme-name` in your WordPress.

3. From admin page of your constructed WordPress, apply theme: `input-theme-name` .

4. Create `.env` by copying `.env-sample` , open `.env` , and set WordPress URL to `BROWSER_SYNC_PROXY` , e.g. `http://localhost:8000` and `http://wordpress.test` .

5. Run `npm i` and `npm run dev` , you will see sample page in `http://localhost:3000` .

### Next

1. Open `wp-content/themes/input-theme-name/style.css` , and edit comments.

2. Open `package.json` , and edit properties.`name`,`description`, and more.

3. Open `webpack.mix.js`, and set your theme name to `themeName` .

4. Rename `resources/themes/input-theme-name` and `wp-content/themes/input-theme-name` to your theme name.