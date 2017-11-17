import named from 'vinyl-named';

import BrowserSync from 'browser-sync';
import Webpack from 'webpack';
import DevServer from 'webpack-dev-server';
import WebpackStream from 'webpack-stream';
import WebpackConfig from '^/webpack.config.babel';

import plumber from 'gulp-plumber';

import Utilities from '@/Utilities';
import appRoot from '@/Utilities/appRoot';

export default class Compile extends Utilities {
    static tasks = {
        compile : 'webpack',
        watch : 'watch'
    };

    static entry = [
        './project/src/App.ts',
        './project/src/App.scss'
    ];

    static output = {
        filename : 'javascripts/application.js',
        path : `${appRoot}/project/dev/`
    };

    constructor (gulp) {
        super();
        this.gulp = gulp;

        this.init();
    }

    init () {
        this.compile();
    }

    webpackChangeHandler (err, stats) {
        this.util.log(stats.toString({
            colors: this.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false
        }));

        BrowserSync.reload();

        this.firstBuildReady = true;
    }

    compile () {
        this.gulp.task(
            Compile.tasks.compile,
            // () => Webpack(WebpackConfig),
            callback => this.gulp.src('')
                .pipe(plumber())
                .pipe(WebpackStream(WebpackConfig, null, this.webpackChangeHandler.bind(this)))
                .pipe(this.gulp.dest(Compile.output.path))
                .on('data', () => {
                    if (this.firstBuildReady && callback) {
                        callback();
                    }
                })
        );
    }
}