const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  target: "node",
  mode: "development",
  entry: "./scripts/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js", // string
  },
  plugins: [
    new NodePolyfillPlugin({
      excludeAliases: ["console"],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 8080,
  },
};
