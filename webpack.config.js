const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    mode: "none",
    entry: "./src/public/app.js",
    output: {
        path: path.resolve(__dirname, "public/assets/js"),
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            "node_modules": path.join(__dirname, "node_modules")
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/bundle.css"
        })
    ]
};
