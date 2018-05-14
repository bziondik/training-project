const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// NODE_ENV not set on process.env https://github.com/webpack/webpack/issues/7074
// const devMode = process.env.NODE_ENV !== 'production'

module.exports = (env, argv) => {  
  const devMode = argv.mode !== 'production'; // solution for devMode
  return {
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
              loader: "sass-loader",
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      })
    ]
  }
};