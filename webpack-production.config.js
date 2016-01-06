var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/scripts/main.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'main.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel-loader'
    	},
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ },
        {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
        include: path.join(__dirname, 'css') 
        },
        {test: /\.css$/,
        loader: 'style-loader!css-loader!less-loader',
        include: path.join(__dirname, 'css') 
        },
        {
    	test: /\.styl$/,
    	loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/',
    	include: path.join(__dirname, 'css') 
  		},
      { test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'css') },
    ]
  }
}