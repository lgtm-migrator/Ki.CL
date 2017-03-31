(function async () {
	'use strict';

	var type;

	angular.module('service.transition', [])
		.service('transition', [
			function transition () {
				function End () {}

				End.prototype.which = function (element) {
					var transitions = {
						"transition"      : "transitionend",
						"OTransition"     : "oTransitionEnd",
						"MozTransition"   : "transitionend",
						"WebkitTransition": "webkitTransitionEnd"
					};

					for (type in transitions){
						if ((element[0] || element).style[type] !== undefined){
							return transitions[type];
						}
					}
				};

				return {
					end : new End()
				};
			}
		]);
}());