module.exports = {
  devServer: {
    proxy: {
      '/free': {
        target: 'http://localhost:3000/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/free': ''
        }
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}