const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = {
  configureWebpack: {
    externals: {
      vue: 'vue',
      '@vue/composition-api': '@vue/composition-api',
    },
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['fr', 'de', 'it', 'pl', 'pt', 'ru', 'es']
      }),
      new MomentTimezoneDataPlugin({
        startYear: 2010,
        endYear: 2030
      })
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    },
    storybook: {
      allowedPlugins: ['define']
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "src/styles/helpers/variables";
        `
      }
    }
  }
}
