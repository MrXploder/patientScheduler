(function() {
	'use strict';

	angular
		.module('angularApp')
		.factory('Doctors', doctors);

	doctors.$inject = ['$resource'];

	function doctors($resource) {
		const Resource = $resource("/doctors/:id", {
			id: "@_id",
		}, {
			create: {
				method: "POST"
			},
			update: {
				method: "PUT"
			}
		});

		Resource.find = function(_q) {
			return Resource.query(_q).$promise;
		}

		Resource.prototype.$save = function() {
			return this._id ? this.$update() : this.$create();
		}

		return Resource;
	};
})();