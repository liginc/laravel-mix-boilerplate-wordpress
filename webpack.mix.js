const mix = require('laravel-mix')
const fs = require('fs-extra')
const multimatch = require('multimatch')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
require('laravel-mix-polyfill')
require('laravel-mix-copy-watched')
require('laravel-mix-eslint')
require('laravel-mix-stylelint')
require('laravel-mix-imagemin')

const srcRelativePath =
  (process.env.MIX_SRC_RELATIVE_PATH || 'resources/themes/input-theme-name')
    .replace(/\/$/, '')
const distRelativePath =
  (process.env.MIX_DIST_RELATIVE_PATH || 'wp-content/themes/input-theme-name')
    .replace(/\/$/, '')

fs.removeSync(`${distRelativePath}/assets`)

mix
  .setPublicPath(distRelativePath) // *1
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
  .stylelint()
  .options({ processCssUrls: false })
  .webpackConfig({
    plugins: [
      new SVGSpritemapPlugin(
        `${srcRelativePath}/assets/svg/sprite/*.svg`, // *2
        {
          output: {
            filename: 'assets/svg/sprite.svg',
            chunk: {
              name: 'assets/js/.svg-dummy-module',
              keep: true // *3
            },
            svgo: {
              plugins: [
                { addClassesToSVGElement: { className: 'svg-sprite' } } // *4
              ]
            },
            svg4everybody: true
          }
        }
      )
    ]
  })
  .copyWatched( // *5
    [
      `${srcRelativePath}/assets/svg/!(sprite)`,
      `${srcRelativePath}/assets/svg/!(sprite)/**/*`
    ],
    `${distRelativePath}/assets/svg`,
    { base: `${srcRelativePath}/assets/svg` }
  )
  .browserSync({ // *6
    open: false,
    host: process.env.MIX_BROWSER_SYNC_HOST || 'localhost',
    port: process.env.MIX_BROWSER_SYNC_PORT || 3000,
    proxy: process.env.MIX_BROWSER_SYNC_PROXY || false,
    files: [
      `${distRelativePath}/assets/**/*`, // *7
      `${distRelativePath}/**/*.php`
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
  .sourceMaps(false, 'inline-cheap-module-source-map') // *8

if (process.env.NODE_ENV === 'production') {
  mix
    .version()
    .imagemin(
      [ 'assets/images/**/*' ],
      { context: srcRelativePath },
      {
        test: filePath => !!multimatch(filePath, [ 'assets/images/**/*' ]).length, // *9
        pngquant: { strip: true, quality: 100-100 }, // 0 ~ 100
        gifsicle: { optimizationLevel: 1 }, // 1 ~ 3
        plugins: [ require('imagemin-mozjpeg')({ quality: 100 }) ] // 0 ~ 100
      }
    )
    .then(() => {
      const svgDummyModuleName = 'assets/js/.svg-dummy-module'
      fs.removeSync(`${distRelativePath}/${svgDummyModuleName}.js`) // *10
      const pathToManifest = `${distRelativePath}/mix-manifest.json`
      const manifest = require(`./${pathToManifest}`)
      delete manifest[`/${svgDummyModuleName}.js`]
      fs.writeFileSync(path.resolve(pathToManifest), JSON.stringify(manifest), 'utf-8') // *11
    })
}

else {
  mix
    .copyWatched( // *12
      `${srcRelativePath}/assets/images`,
      `${distRelativePath}/assets/images`,
      { base: `${srcRelativePath}/assets/images` }
    )
}

/*

*1
`setPublicPath()` is required.
Because it determines directory where mix-manifest.json is output.

*2
Following setting must not be set.
`${srcRelativePath}/assets/svg/sprite/** /*.svg`
Because, file name determines id attribute, so all target file names must be unique.

*3
Keep chunk file without deletion.
Because error occurs if chunk file has deleted when creating mix-manifest.json.

*4
`svg-sprite` class is required.
Because it has style to hide sprite.

*5
This method copies SVG that is not sprite.

*6
Although reloading is necessary to see changes of the SVG file,
BrowserSync executes ingection instead of reloading when changing SVG.
Options of BrowserSync can not change this behavior.
https://github.com/BrowserSync/browser-sync/issues/1287

*7
Following setting must not be set.
`${distRelativePath}/** /*`
Because injection of changes such as CSS will be not available.
https://github.com/JeffreyWay/laravel-mix/issues/1053

*8
Note that several types don't output map for CSS.
https://webpack.js.org/configuration/devtool/#devtool

*9
`test` option is required.
Because imagemin can not find targets exactly without this function.

*10
This is unnecessary chunk file created by SVGSpritemapPlugin.

*11
Data of file removed in *9, are removed from mix-manifest.json too.

*12
It is unnecessary to optimize images in development mode.

*/
