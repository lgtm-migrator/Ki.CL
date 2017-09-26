import named from 'vinyl-named';

import Webpack from 'webpack';
import DevServer from 'webpack-dev-server';
import WebpackStream from 'webpack-stream';
import WebpackConfig from '^/webpack.config';

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

        this.firstRun = true;

        this.init();
    }

    init () {
        this.compile();
    }

    compile () {
        this.gulp.task(
            Compile.tasks.compile,
            () => {
                new DevServer(
                    Webpack(
                        Object.assign({}, WebpackConfig, {
                            entry : Compile.entry,
                            output : Compile.output
                        })
                    ),
                    {
                        publicPath : '/project/dev/',
                        stats: {
                            colors: true
                        }
                    }
                ).listen(3031, 'localhost', error => {
                    if(error) throw new gutil.PluginError("webpack-dev-server", error);
                    // Server listening
                    console.log("[webpack-dev-server]", "http://localhost:3031/webpack-dev-server/index.html");

                    // keep the server alive or continue?
                    // callback();
                })
            }
            // () => this.gulp.src(Compile.entry, { cwd : this.path.root.src })
            //     .pipe(named())
            //     .pipe(WebpackStream(Object.assign({}, WebpackConfig, {
            //         entry : Compile.entry,
            //         output : Compile.output
            //     }), Webpack))
            //     .pipe(this.gulp.dest(this.path.root.dev))
        );
    }
}