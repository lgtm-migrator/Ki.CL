import gulp from 'gulp';
import util from 'gulp-util';

import AppRoot from './AppRoot';
import Path from './Path';

export default class Utilities {
	gulp = gulp;
	util = util;

	appRoot = AppRoot;
	path = Path;
}