const mix = require('laravel-mix')
const path = require('path')
const fs = require('fs-extra')
const multimatch = require('multimatch')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const fastGlob = require('fast-glob')
const sharp = require('sharp')
require('laravel-mix-polyfill')
require('laravel-mix-copy-watched')
require('laravel-mix-eslint')
require('laravel-mix-stylelint')
require('laravel-mix-imagemin')

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
  .webpackConfig({
    module: {
        rules: [{
            test: /\.scss/,
            enforce: 'pre',
            loader: 'import-glob-loader'
        }]
    }
   })
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
      [ 'assets/images/**/*' ],
      { context: srcRelativePath },
      {
        test: filePath => !!multimatch(filePath, [ 'assets/images/**/*' ]).length,
        pngquant: { strip: true, quality: 100-100 }, // 0 ~ 100
        gifsicle: { optimizationLevel: 1 }, // 1 ~ 3
        plugins: [ require('imagemin-mozjpeg')({ quality: 100 }) ] // 0 ~ 100
      }
    )
    .then(() => {
      const svgDummyModuleName = 'assets/js/.svg-dummy-module'
      fs.removeSync(`${distRelativePath}/${svgDummyModuleName}.js`)
      const pathToManifest = `${distRelativePath}/mix-manifest.json`
      const manifest = require(`./${pathToManifest}`)
      delete manifest[`/${svgDummyModuleName}.js`]
      fs.writeFileSync(path.resolve(pathToManifest), JSON.stringify(manifest), 'utf-8')
    })

  // resources/themes/pureri/assets/images 内の jpg, png を webp に変換し同じディレクトリに出力する
  const relativePathList =
      fastGlob.sync(`${srcRelativePath}/assets/images/**/*.{jpg,png}`)
  for (let relativePath of relativePathList) {
      const extname = path.extname(relativePath)
      const regExp = new RegExp(`${extname}$`, 'i')
      const pathWithoutExtname = relativePath.replace(regExp, '')
      sharp(relativePath)
        .toFormat('webp', { quality: 100 })
        .toFile(`${pathWithoutExtname}.webp`);
  }
}

else {
  mix
    .copyWatched(
      `${srcRelativePath}/assets/images`,
      `${distRelativePath}/assets/images`,
      { base: `${srcRelativePath}/assets/images` }
    )
}
