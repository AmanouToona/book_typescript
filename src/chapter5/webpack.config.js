"use strict";
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "src/index.jsx"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js", "jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|jsx)/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
};
