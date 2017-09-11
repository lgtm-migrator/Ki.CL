import { Gulpclass, Task, SequenceTask } from 'gulpclass';

import SCSS from './SCSS';
import TS from './TS';

const build = 'build';
const dev = 'dev';
const watch = 'watch';

@Gulpclass() export default class Gulptasks {
    @SequenceTask(build) production() {
        return [dev, [SCSS.task.bundle]];
    }

    @SequenceTask(dev) development() {
        return [SCSS.task.compile, TS.task.compile];
    }

    @Task(watch) watcher() {
        SCSS.watch();
    }

    @SequenceTask('default') defaultTask() {
        return [dev, watch];
    }
}