module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: 'html-loader'
      },
      {
        loader: 'markdown-loader',
        options: {
          pedantic: true
        }
      }
    ]
  })

  return config
}
