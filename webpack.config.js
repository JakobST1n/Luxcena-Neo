const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const SoundsPlugin = require('sounds-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

function tryResolve_(url, sourceFilename) {
    // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
    // when the importer throws
    try {
        return require.resolve(url, {paths: [path.dirname(sourceFilename)]});
    } catch (e) {
        return '';
    }
}

function tryResolveScss(url, sourceFilename) {
    // Support omission of .scss and leading _
    const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`;
    return tryResolve_(normalizedUrl, sourceFilename) ||
        tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
        sourceFilename);
}

function materialImporter(url, prev) {
    if (url.startsWith('@material')) {
        const resolved = tryResolveScss(url, prev);
        return {file: resolved || url};
    }
    return {file: url};
}

module.exports = [{
    context: __dirname + "/src/frontendDomain/",
    entry: [
        './scss/app.scss',
        './js/app.js'
    ],
    output: {
        path: __dirname + "/public/assets",
        filename: 'bundle.js',
    },
    devtool: "source-map",
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
            //chunkFilename: 'public/assets/123.css',
        }),
        new SoundsPlugin({
            sounds: {
                customSuccess: "/System/Library/Sounds/Ping.aiff",
            },
            notifications: {
                $success : "customSuccess",
            }
        }),
        new WebpackBuildNotifierPlugin({
            title: "Luxcena-neo-design-rewrite",
            logo: "./public/assets/img/logo/Icon-BG-1x.png",
            suppressSuccess: false
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                            //publicPath: "../public/assets/",
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            importer: materialImporter,
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}];
