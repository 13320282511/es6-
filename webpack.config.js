/**
 * Created by zj on 2017/12/6.
 */
var path = require('path');
module.exports = {
    entry: "./src/platforms/web/entry-runtime-with-compiler.js",
    output: {
        path: __dirname,
        filename: "./dist/index.js"
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'es6'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}