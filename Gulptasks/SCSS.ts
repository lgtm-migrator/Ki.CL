import { Gulpclass, Task } from 'gulpclass';

import Utilities from './Utilities';

import * as gulp from 'gulp';

import * as autoprefixer from 'gulp-autoprefixer';
import * as cached from 'gulp-cached';
import * as concat from 'gulp-concat-css';
import * as cleanCSS from 'gulp-clean-css';
import * as plumber from 'gulp-plumber';
import * as scss from 'gulp-sass';
import * as scsslint from 'gulp-scss-lint';
import * as sourcemaps from 'gulp-sourcemaps';

interface Validator {
    readonly task : object;
    readonly watch : Function;
}

@Gulpclass() export default class SCSS extends Utilities implements Validator {
    static task = {
        compile : 'SCSS.compile',
        bundle : 'SCSS.bundle',
        watch : 'SCSS.watch'
    };
    get task() : object { return SCSS.task; }

    @Task(SCSS.task.compile) compile() {
        return gulp.src([super.src.scss, super.ignore.scss], super.config.src)
            .pipe(plumber())
            .pipe(cached('scsslint'))
            .pipe(scsslint(super.config.scsslint))
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer(super.config.autoprefixer))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(super.dest.dev));
    };

    @Task(SCSS.task.bundle) build() {
        return gulp.src(super.src.css, super.config.bundle)
            .pipe(concat('stylesheet.css'))
            .pipe(cleanCSS(super.config.cleanCSS, details => {
                console.log('');
                console.log(` > ${super.dest.build}/${details.name}: ${details.stats.minifiedSize}kb`);
                console.log('');
            }))
            .pipe(gulp.dest(super.dest.build));
    };

    static watch() {
        super.watcher(super.src.scss, super.config.src, SCSS.task.compile);
        super.watcher(super.src.css, super.config.bundle, SCSS.task.bundle);
    }
    get watch() : Function { return SCSS.watch; }
}