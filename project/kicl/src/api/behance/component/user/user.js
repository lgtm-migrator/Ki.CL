(function user () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference',
			function controller (root, scope, reference) {
				var callback = {
						data : function (data) {
							reference.component.user.resolved = data.$resolved;

							scope.stats = data.user.stats;
							scope.stats.content = reference.component.user.content.stats;

							root.$broadcast('behance.user.data', scope.projects);
						}
					};

				if (!reference.component.user.promise) {
					reference.component.user.promise = reference.api.user().$promise;
				}

				reference.component.user.promise.then(callback.data);
			}
		];

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/user/user.html',
			controller : controller
		};
	}

	angular.module('behance.component.user', [
		'behance.component.user.about',
		'behance.component.user.info',
		'behance.component.user.stats'
	])
		.directive('behanceUser', [
			directive
		]);
}());
