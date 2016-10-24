'use strict';

class ComponentState {
	constructor () {}

	update (currentState, callback) {
		if (!this.updater.isMounted(this)) {
			return;
		}

		this.setState((previousState, currentProps) => {
			return $.extend(true, {}, previousState, currentState);
		}, callback ? callback : null);
	}
}

export default new ComponentState();