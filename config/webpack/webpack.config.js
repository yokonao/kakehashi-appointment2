const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    app: "./app/javascript/packs/app.tsx",
    login: "./app/javascript/packs/login.tsx",
    admin: "./app/javascript/packs/admin.tsx",
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    chunkFormat: "module",
    path: path.resolve(__dirname, "..", "..", "app/assets/builds"),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "..", "..", "app/javascript"),
      path.resolve(__dirname, "..", "..", "node_modules"),
    ],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|eot|woff2|woff|ttf|svg)$/i,
        use: "file-loader",
      },
    ],
  },
};
