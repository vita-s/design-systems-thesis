const path = require('path')

module.exports = {
  stories: ['../../src/stories/**/*stories.@(ts|js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        vueDocgenOptions: {
          alias: {
            '@': path.resolve(__dirname, '../../src/')
          }
        }
      }
    },
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-notes'
  ]
}
