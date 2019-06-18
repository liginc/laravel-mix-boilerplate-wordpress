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

2. Open `package.json` , and edit properties. Name, description, and more.

3. Open `webpack.mix.js`, and set your theme name to `themeName` .

4. Rename `resources/themes/input-theme-name` and `wp-content/themes/input-theme-name` to your theme name.
