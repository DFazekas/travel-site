var path = require('path');

module.exports = {
    /* Bundle up all JS files, rename it and export to the temp directory. */
    entry: {
        App: "./app/assets/scripts/App.js",
        Vendor: "./app/assets/scripts/Vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "./app/temp/scripts"),
        filename: "[name].js"
    },
    /* Convert our JS file for increased browser support. */
    module: {
         loaders: [
             {
                 loader: 'babel-loader',
                 query: {
                     /* We're using ES6 presets. */
                     presets: ['es2015']
                 },
                 /* Regex for only JS files. */
                 test: /\.js$/,
                 /* Tell Webpack that not all JS files in our project need to be converted by Babel. */
                 exclude: /node_modules/
             }
         ]
    }
}