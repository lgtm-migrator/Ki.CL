import fs from 'fs';
import webpack from 'webpack';

import AutoPrefixer from 'autoprefixer';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import CleanWebpack from 'clean-webpack-plugin';
import ExtractText from 'extract-text-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HistoryApiFallback from 'connect-history-api-fallback';
import HtmlWebpack from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

import Utilities from '@/Utilities';

import tslintConfig from './tslint.json';

function assetLoader (test, options) {
    options.name = '[path][name].[ext]';

    return {
        test : test,
        use : [
            {
                loader : 'file-loader',
                options  : options
            }
        ]
    };
}

class WebpackConfig extends Utilities {
    constructor () {
        super();

        return {
            watch : true,
            
            target : 'web',
            
            resolve : {
                extensions : ['.ts', '.json', 'scss'],
                modules : ['node_modules'],
                alias : {
                    '~' : `${this.appRoot}/${this.path.root.src}`,
                    '@' : `${this.appRoot}/node_modules`
                }
            },
            
            devtool : 'source-map',
            
            module : {
                rules : [
                    {
                        test : /\.ts$/,
                        exclude : /(node_modules|Gulptasks)/,
                        enforce : 'pre',
                        use : [
                            {
                                loader : 'ts-loader',
                                options : {
                                    transpileOnly : true
                                }
                            },
                            {
                                loader : `tslint-loader`,
                                options : tslintConfig
                            }
                        ]
                    },

                    {
                        test : /\.(css|sass|scss)$/,
                        exclude : /node_modules/,
                        use : ['css-hot-loader'].concat(ExtractText.extract({
                            fallback : 'style-loader',
                            use : [
                                {
                                    loader : 'css-loader',
                                    options : {
                                        constLoaders : 1,
                                        minimize : true
                                    }
                                },
                                {
                                loader : 'clean-css-loader',
                                    options : {
                                        compatibility : 'ie8',
                                        debug : true,
                                        level : {
                                            2 : {
                                                all : true
                                            }
                                        }
                                    }
                                },
                                {
                                    loader : 'postcss-loader',
                                    options : {
                                        plugins : loader => [
                                            AutoPrefixer({
                                                browsers : ['last 2 versions'],
                                                cascade : false
                                            })
                                        ]
                                    }
                                },
                                {
                                    loader : 'fast-sass-loader',
                                    options : {
                                        includePaths : [
                                            'node_modules',
                                            `${this.path.root.src}`
                                        ]
                                    }
                                }
                            ]
                        }))
                    },

                    assetLoader(/\.(gif)$/i, { mimetype : 'image/gif' }),
                    assetLoader(/\.(jpe?g)$/i, { mimetype : 'image/pjpeg' }),
                    assetLoader(/\.(png)$/i, { mimetype : 'image/png' }),

                    assetLoader(/\.svg$/, { mimetype : 'image/svg+xml' }),
                    assetLoader(/\.woff$/, { mimetype : 'application/font-woff' }),
                    assetLoader(/\.woff2$/, { mimetype : 'application/font-woff2' }),
                    assetLoader(/\.[ot]tf$/, { mimetype : 'application/octet-stream' }),
                    assetLoader(/\.eot$/, { mimetype : 'application/vnd.ms-fontobject' })
                ]
            },

            plugins : [
                new HtmlWebpack({
                    filename : `index.html`,
                    template : `project/src/index.html`,
                    alwaysWriteToDisk : true,
                    cache : true,
                    hash : false,
                    inject : true,
                    xhtml : true
                }),

                new ExtractText({
                    filename : `stylesheets/application.css`,
                    allChunks : true
                }),

                new ForkTsCheckerWebpackPlugin(),

                new StyleLintPlugin({
                    configFile : `${this.appRoot}/.stylelintrc`
                }),

                new webpack.optimize.OccurrenceOrderPlugin(true),
                new webpack.NoEmitOnErrorsPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.LoaderOptionsPlugin({
                    debug : true
                }),

                new ProgressBarPlugin(),

                new BrowserSyncPlugin(
                    {
                        name : 'Ki.CL',
                        host: 'localhost',
                        port : 3021,
                        proxy: 'http://localhost:3031/'
                    },
                    {
                        reload: false
                    }
                )
            ],

            devServer : {
                contentBase: `${this.appRoot}/project/dev`,
                colors : true,
                quiet : false,
                noInfo : false,
                publicPath : '/project/dev/',
                historyApiFallback : true,
                host : '127.0.0.1',
                port : 3031,
                hot : true
            }
        };
    }
}

module.exports = new WebpackConfig();