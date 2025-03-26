const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  watch: true,
  entry: {
    index: "./index/index.js",
  },
  context: path.resolve(__dirname, "./src/pages"),
  output: {
    filename: "scripts/[name].[contenthash:5].js",
    path: path.resolve(__dirname, "../server/views"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index/index.html",
      filename: "[name]/index.html",
      chunks: ["index"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "index/assets",
          to: "index/assets",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              url: true,
            },
          },
        ],
      },
    ],
  },
};
