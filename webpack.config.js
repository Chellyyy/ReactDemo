var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: __dirname + "/src/js/root.js",
  output: {
    path: __dirname + "/dist/",
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      type: "javascript/auto",
      query: {
        presets: ['es2015', 'react', 'stage-2'],
        plugins: [
          ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css"
          }] // `style: true` 会加载 less 文件
        ]
      }
    },
    {
      test: /\.css$/,
      //使用antd
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }
  ]
  },
  devServer: {
    //contentBase: './dist', //一定要写
    host: 'localhost',
    port: 8080,
    inline: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
