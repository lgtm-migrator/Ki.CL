'use strict';

import gulp from 'gulp';
import bower from './lib.bower';
import plugin from './lib.plugin';
import priority from './lib.priority';

const taskName = 'lib';

class Lib {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task (callback) {
		return gulp.run(priority.taskName, bower.taskName, plugin.taskName, callback);
	}
}

export default new Lib();