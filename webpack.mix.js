const mix = require('laravel-mix')
const fs = require('fs-extra')
const multimatch = require('multimatch')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
require('laravel-mix-polyfill')
require('laravel-mix-copy-watched')
require('laravel-mix-eslint')
require('laravel-mix-stylelint')
require('laravel-mix-imagemin')
require('laravel-mix-webp')

const srcRelativePath =
  (process.env.MIX_SRC_RELATIVE_PATH || 'resources/themes/input-theme-name')
    .replace(/\/$/, '')
const distRelativePath =
  (process.env.MIX_DIST_RELATIVE_PATH || 'wp/wp-content/themes/input-theme-name')
    .replace(/\/$/, '')

fs.removeSync(`${distRelativePath}/assets`)

mix
  .setPublicPath(distRelativePath)
  .polyfill()
  .js(
    `${srcRelativePath}/assets/js/app.js`,
    `${distRelativePath}/assets/js`
  )
  .eslint()
  .sass(
    `${srcRelativePath}/assets/css/app.scss`,
    `${distRelativePath}/assets/css`
  )
  .stylelint({ context: srcRelativePath })
  .options({ processCssUrls: false })
  .webpackConfig({
    plugins: [
      new SVGSpritemapPlugin(
        `${srcRelativePath}/assets/svg/sprite/*.svg`,
        {
          output: {
            filename: 'assets/svg/sprite.svg',
            chunk: {
              name: 'assets/js/.svg-dummy-module',
              keep: true
            },
            svgo: {
              plugins: [
                { addAttributesToSVGElement: { attributes: [{ 'data-svg-sprite': '' }] } }
              ]
            },
            svg4everybody: true
          }
        }
      )
    ]
  })
  .copyWatched(
    [
      `${srcRelativePath}/assets/svg/!(sprite)`,
      `${srcRelativePath}/assets/svg/!(sprite)/**/*`
    ],
    `${distRelativePath}/assets/svg`,
    { base: `${srcRelativePath}/assets/svg` }
  )
  .browserSync({
    open: false,
    host: process.env.MIX_BROWSER_SYNC_HOST || 'localhost',
    port: process.env.MIX_BROWSER_SYNC_PORT || 3000,
    proxy: process.env.MIX_BROWSER_SYNC_PROXY || false,
    files: [
      `${distRelativePath}/assets/**/*`,
      `${distRelativePath}/**/*.php`,
      `!${distRelativePath}/functions/autoload/99_acf_setting.php`
    ],
    https:
      process.env.MIX_BROWSER_SYNC_HTTPS_CERT &&
      process.env.MIX_BROWSER_SYNC_HTTPS_KEY
        ? {
          cert: process.env.MIX_BROWSER_SYNC_HTTPS_CERT,
          key: process.env.MIX_BROWSER_SYNC_HTTPS_KEY
        }
        : false
  })
  .sourceMaps(false, 'inline-cheap-module-source-map')

if (process.env.NODE_ENV === 'production') {
    mix
        .version()
        .imagemin(
            ['assets/images/**/*'],
            {context: srcRelativePath},
            {
                test: filePath => !!multimatch(filePath, ['assets/images/**/*']).length,
                pngquant: {strip: true, quality: 80}, // 0 ~ 100
                gifsicle: {optimizationLevel: 1}, // 1 ~ 3
                plugins: [require('imagemin-mozjpeg')({quality: 60})] // 0 ~ 100
            }
        )
        .ImageWebp({
            from: `${srcRelativePath}/assets/images`,
            to: `${distRelativePath}/assets/images`,
        })
        .then(() => {
            const svgDummyModuleName = 'assets/js/.svg-dummy-module'
            const pathToManifest = `${distRelativePath}/mix-manifest.json`
            const manifest = JSON.parse(fs.readFileSync(path.resolve(pathToManifest), 'utf8'));

            fs.removeSync(`${distRelativePath}/${svgDummyModuleName}.js`)
            delete manifest[`/${svgDummyModuleName}.js`]

            glob.sync(`${distRelativePath}/assets/images/**/*.webp`).forEach((imagePath) => {
                manifest[imagePath.replace(distRelativePath, '')] = imagePath.replace(distRelativePath, '') + '?id=' + new File(imagePath).version()
            })
            fs.writeFileSync(path.resolve(pathToManifest), JSON.stringify(manifest), 'utf-8')
        })
}

else {
  mix
    .copyWatched(
      `${srcRelativePath}/assets/images`,
      `${distRelativePath}/assets/images`,
      { base: `${srcRelativePath}/assets/images` }
    )
}
