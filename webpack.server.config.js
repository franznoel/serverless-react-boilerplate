const path = require("path");
const slsw = require("serverless-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { IgnorePlugin } = require("webpack");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  node: {
    __dirname: true,
    __filename: true,
  },
  optimization: {
    minimize: false, // We don't need to minimize our Lambda code.
    moduleIds: "named",
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false,
  },
  devtool: "nosources-source-map",
  externals: {
    // Possible drivers for knex - we'll ignore them
    'sqlite3': 'sqlite3',
    'mariasql': 'mariasql',
    'mssql': 'mssql',
    'mysql': 'mysql',
    'mysql2': 'mysql2',
    'oracle': 'oracle',
    'strong-oracle': 'strong-oracle',
    'oracledb': 'oracledb',
    'pg-native': 'pg-native',
    'pg-query-stream': 'pg-query-stream',
    'tap': 'tap',
    'tedious': 'tedious',
    'better-sqlite3': 'better-sqlite3',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/, // we shouldn't need processing `node_modules`
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: "null-loader", // No server-side CSS processing
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: "url-loader",
      },
    ],
  },
  resolve: {
    // TsconfigPathsPlugin applies the path aliases defined in `.tsconfig.json`
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".server.tsx", ".server.ts", ".server.jsx", ".server.js", ".tsx", ".ts", ".jsx", ".js"],
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
    sourceMapFilename: "[file].map",
  },
};
