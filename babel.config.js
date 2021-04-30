module.exports = {
  presets: [['@vue/app', { useBuiltIns: false, modules: false, jsx: false }]],
  plugins: ['@babel/plugin-proposal-optional-chaining']
}
