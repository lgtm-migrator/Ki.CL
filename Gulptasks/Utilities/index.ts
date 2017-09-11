import AppRoot from './AppRoot';
import Watch from './Watch';

interface Validator {
    readonly appRoot : string;
    readonly watcher : Function;
    readonly src : object;
    readonly ignore : object;
    readonly dest : object;
    readonly config : object;
}

export default class Utilities implements Validator {
    static appRoot = AppRoot;
    get appRoot() { return Utilities.appRoot; }

    static watcher = Watch.watcher;
    get watcher() { return Utilities.watcher; }

    static src = {
        css : '**/*.css',
        html : '**/*.html',
        js : '**/*.js',
        scss : '**/*.scss',
        ts : '**/*.ts'
    };
    get src() : object { return Utilities.src; }

    static ignore = {
        scss : '!**/_*.scss'
    };
    get ignore() : object { return Utilities.ignore; }

    static dest = {
        dev : 'project/dev',
        build : 'project/build'
    };
    get dest() : object { return Utilities.dest; }

    static config = {
        src : {
            cwd : 'project/src'
        },
        bundle : {
            cwd : 'project/dev',
        },
        scsslint : {
            config : './scss-lint.yml',
            reporterOutputFormat : 'Checkstyle'
        },
        autoprefixer : {
            browsers : ['last 2 versions'],
            cascade : false
        },
        cleanCSS : {
            compatibility : 'ie8',
            debug : true,
            level : {
                2 : {
                    all: true
                }
            }
        }
    };
    get config() : object { return Utilities.config; }
}