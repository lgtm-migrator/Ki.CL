import AppRoot from './AppRoot';

import * as gulp from 'gulp';

interface Validator {
    readonly logger : Function;
    readonly watcher : Function;
}

export default class Watch implements Validator {
    static logger (tasks) {
        return event => {
            console.log(`File ${event.path.replace(`${AppRoot}/project/src/`, '')} was ${event.type}, running ${tasks.join(', ')}`);
        }
    }
    get logger() : Function { return Watch.logger; }

    static watcher (src : (string|object), options : object, tasks) {
        tasks = Array.isArray(tasks) ? tasks : [tasks];

        const instance =  gulp.watch(src, options, tasks);

        instance.on('change', Watch.logger(tasks));
    }
    get watcher() : Function { return Watch.watcher; }
}