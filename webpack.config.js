const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');

var path = require('path')
// NODE_ENV not set on process.env https://github.com/webpack/webpack/issues/7074
// const devMode = process.env.NODE_ENV !== 'production'

module.exports = (env, argv) => {  
  const devMode = argv.mode !== 'production'; // solution for devMode
  return {
    devtool: 'inline-source-map',
    entry: [
      path.resolve(__dirname, 'client/index.js'),
      path.resolve(__dirname, 'client/stylesheets/main.scss')
    ],
    output: {
      path: path.join(__dirname, 'public'),
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { 
                minimize: devMode ? false : true 
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                    autoprefixer({
                        browsers:['ie >= 8', 'last 4 version']
                    })
                ],
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'public'),]),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'client/index.html'),
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? './css/[name].css' : './css/[name].[hash].css',
        chunkFilename: devMode ? './css/[id].css' : './css/[id].[hash].css',
      })
    ]
  }
};