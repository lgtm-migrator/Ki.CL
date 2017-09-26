import sequence from 'run-sequence';
import gulp from 'gulp';
import helper from 'gulp-help';
import sync from 'gulp-sync';

import Utilities from '@/Utilities';

import Compile from '@/Compile';

export default class Gulptasks extends Utilities {
    static tasks = {
        default : 'default'
    };

    constructor () {
        super();
        
        this.gulp = helper(gulp);

        this.gulp.Gulp.prototype.run = sequence;
        this.gulp.Gulp.prototype.sync = sync;

        this.webpack = new Compile(this.gulp);

        this.init();
    }

    init () {
        this.gulp.task(
            Gulptasks.tasks.default,
            done => {
                this.gulp.run(
                    Compile.tasks.compile,
                    done
                );
            }
        );
    }
}