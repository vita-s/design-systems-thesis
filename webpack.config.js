module.exports = {
  devServer: {
    writeToDisk: true,
    port: 9000,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
