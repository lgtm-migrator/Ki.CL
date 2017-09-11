import { Gulpclass, Task } from 'gulpclass';

import Utilities from './Utilities';

import * as gulp from 'gulp';

import * as sourcemaps from 'gulp-sourcemaps';
import * as typescript from 'gulp-typescript';
import tslint from 'gulp-tslint';

interface Validator {
    readonly task : object;
    readonly watch : Function;
}

@Gulpclass() export default class TS extends Utilities implements Validator {
    static task = {
        compile : 'TS.compile',
        watch : 'TS.watch'
    };
    get task() : object { return TS.task; }

    @Task(TS.task.compile) compile() {
        return gulp.src([super.src.ts], super.config.src)
            .pipe(tslint({
                formatter : 'stylish'
            }))
            .pipe(tslint.report({
                allowWarnings: true,
                emitError : false,
                summarizeFailureOutput : true
            }))
            .pipe(sourcemaps.init())
            .pipe(typescript({
                outFile : 'javascript.js'
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(super.dest.dev));
    };

    @Task(TS.task.watch) watch() {
        super.watcher(super.src.ts, super.config.src, TS.task.compile);
    }
}