const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/js/index.js'],
    data: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/js/data.js'],
    detail: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/js/detail.js'],
    speciesComposition: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/js/speciesComposition.js'],
    temporalDistribution: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/js/temporalDistribution.js']
  },
  output: {
    path: '/',
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
        use: {
          loader: 'file-loader',
          options: {
            name: 'webfonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name].[ext]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
}
