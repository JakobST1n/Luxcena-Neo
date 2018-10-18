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
        extensions: ['.js', '.css', '.scss'],
        alias: {
            "fontawesome": path.join(__dirname, "/node_modules/@fortawesome/fontawesome-free/js/all.min.js"),
            "node_modules": path.join(__dirname, "/node_modules")
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
