(function sitemap () {
	'use strict';
	
	var cache = {},
		current = cache;

	function setParent (map) {
		var mapArray = map.split('.'),
			currentNode = cache;

		function eachElement (name, index) {
			if (!currentNode[name]) {
				currentNode[name] = {};
			}

			if (!currentNode[name].children) {
				currentNode[name].children = {};
			}

			currentNode = currentNode[name];
		}

		mapArray.forEach(eachElement);

		return currentNode;
	}

	function findParent (map) {
		var mapArray = map.split('.'),
			currentNode = cache;

		function eachElement (name, index) {
			if (!currentNode[name]) {
				currentNode = undefined;

				return;
			}

			currentNode = currentNode[name].children || currentNode[name];
		}

		mapArray.forEach(eachElement);

		return currentNode;
	}

	angular.module('factory.sitemap', [])
		.service('sitemap', [
			'$rootScope',
			function factory (root) {
				function Sitemap () {}

				Sitemap.prototype.current = function (id, map) {
					var parent = cache;

					if (cache[""]) {
						delete cache[""];
					}

					if (arguments.length <= 0) {
						return current;
					}

					if (map !== 'root') {
						parent = findParent(map);
					}

					if (parent.children) {
						parent = parent.children;
					}

					if (!parent[id]) {
						parent[id] = {};
						parent[id].parent = parent;
					}

					current = parent[id];
					
					root.$broadcast('sitemap.current.updated', current);

					return current;
				};

				Sitemap.prototype.add = function (id, prop, map) {
					var parent = cache;

					if (cache[""]) {
						delete cache[""];
					}

					if (map) {
						parent = setParent(map);
					}

					if (!(parent.children || parent)[id]) {
						(parent.children || parent)[id] = {};
					}

					Object.keys(prop).forEach(function (name) {
						(parent.children || parent)[id][name] = prop[name];
					});

					(parent.children || parent)[id].parent = parent;

					if (!parent.children) {
						parent[id].root = true;
					}

					return parent[id];
				};

				Sitemap.prototype.get = function (map) {
					var parent = cache;

					if (cache[""]) {
						delete cache[""];
					}

					if (!map || map === 'root') {
						return cache;
					}

					return findParent(map);
				};

				return new Sitemap();
			}
		]);
}());