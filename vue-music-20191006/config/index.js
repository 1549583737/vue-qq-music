'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/getDiscList': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com'
          req.headers.host = 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/getDiscList': ''
        }
      },
      '/api/music': {
        target: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg',
        // target: 'https://dl.stream.qqmusic.qq.com',
        // target: 'https://c.y.qq.com/tips/fcgi-bin/fcg_music_red_dota.fcg',
        // target: 'https://ws.stream.qqmusic.qq.com',
        // target: 'https://c.y.qq.com/v8/fcg-bin/v8.fcg',
        // target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com'
          req.headers.host = 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/music': ''
        }
      },
      '/api/getSongList': {
        target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
        secure: false,
        changeOrigin: true,
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://txt.mqq.all/'
          req.headers.host = 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/getSongList': ''
        }
      }
      // 'api/search_for_qq': {
      //   target: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq.cp',
      //   secure: false,
      //   changeOrigin: true,
      //   bypass: function (req, res, proxyOptions) {
      //     req.headers.referer = 'https://c.y.qq.com/'
      //     req.headers.host = 'c.y.qq.com'
      //   },
      //   pathRewrite: {
      //     '^/api/search_for_qq': ''
      //   }
      // }
      // '/api/getplaysongvkey': {
      //   target: 'https://vkey/cgi-bin/musicu.fcg',
      //   bypass: function (req, res, proxyOptions) {
      //     req.headers.origin = 'https://y.qq.com';
      //     req.headers.referer = 'https://y.qq.com/portal/player.html';
      //     req.headers.host = 'y.qq.com';
      //     // req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      //   },
      //   pathRewrite: {
      //     '^/api/getplaysongvkey': ''
      //   }
      // }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
