var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  var config = {
    context: path.join(__dirname, 'examples'),
    entry: './index.js',
    output: {
      path: path.join(__dirname, '/docs'),
      filename: 'bundle.js'
    },
    resolve: {
      alias: {
        'qalendar': path.join(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ],
    devServer: {
      port: 3000
    }
  }

  return config
}
