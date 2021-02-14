const path = require("path");

module.exports = {
  //Entrypoint: We need app.js to be here. This is where webpack starts looking for dependencies
  entry: "./src/app.ts",
  output: {
    //Could have [contenthash] to assist in caching somehow
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        //Regular expression here means find all files that end with .ts
        test: /\.ts/,
        //Run .ts files with ts-loader
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  //Bundle files with filetypes below into a single file
  resolve: {
    extensions: [".ts", ".js"],
  },
};
