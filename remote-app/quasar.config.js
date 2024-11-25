
// const ESLintPlugin = require('eslint-webpack-plugin')


// const { configure } = require('quasar/wrappers');


const ESLintPlugin = require('eslint-webpack-plugin');
const { configure } = require('quasar/wrappers');
const dependencies = require('./package.json').dependencies;
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const path = require('path');
module.exports = configure(function (ctx) {
  return {
    supportTS: false,

    boot: [
    ],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font',
      'material-icons',
    ],

    build: {
      vueRouterMode: 'hash',
      extendWebpack(cfg) {
        cfg.entry = path.resolve(__dirname, './main.js');
        cfg.plugins.push(
          new ModuleFederationPlugin({
            name: 'remoteApp',         //name of app
            filename: 'remoteEntry.js',  // entry file name
            exposes: {                   // expose these components
              './RemoteComponent.vue': 'src/components/RemoteComponent.vue',
            },
             remotes: {},
            shared: {
              ...dependencies,
            },
          }),
        );
      },
      chainWebpack(chain) {
        chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js', 'vue'] }]);

        chain.optimization.delete('splitChunks');   //added this line
      },

    },

    devServer: {
      server: {
        type: 'http'
      },
      port: 8081,
      open: true // opens browser window automatically
    },

    framework: {
      config: {},

      plugins: []
    },

    animations: [],

    ssr: {
      pwa: false,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,


      chainWebpackWebserver(chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },


      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {},
      chainWebpackCustomSW(chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },


      manifest: {
        name: `remote-app`,
        short_name: `remote-app`,
        description: `A Quasar Project`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    cordova: {
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {

      },

      builder: {

        appId: 'remote-app'
      },


      chainWebpackMain(chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },



      chainWebpackPreload(chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

    }
  }
});
