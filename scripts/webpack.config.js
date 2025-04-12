const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  watch: true,
  entry: {
    index: "./index/index.js",
    caches: "./caches/index.js",
  },
  context: path.resolve(__dirname, "./src/pages"),
  output: {
    filename: "scripts/[name].[contenthash:5].js",
    path: path.resolve(__dirname, "../server/views"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "主页",
      template: "./index/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      title: "缓存测试",
      template: "./caches/index.html",
      filename: "caches.html",
      chunks: ["caches"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "caches/assets",
          to: "assets",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "stylesheets/[name]-[contenthash:5].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          {
            loader: "css-loader",
            options: {
              url: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: function (content, loaderContext) {
                const { resourcePath } = loaderContext;
                if (resourcePath.endsWith("index.scss")) {
                  return `
                    @use "@/styles/global.scss";
                    ${content}
                  `;
                }
                return `${content}`;
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g)/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name]-[contenthash:5].[ext]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
