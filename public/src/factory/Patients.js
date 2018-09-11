(function() {
	'use strict';

	angular
		.module('angularApp')
		.factory('Patients', patients);

	patients.$inject = ['$resource'];

	function patients($resource) {
		const Resource = $resource("/patients/:id", {
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