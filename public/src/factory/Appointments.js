(function() {
	'use strict';

	angular
		.module('angularApp')
		.factory('Appointments', appointmentsFactory);

	appointmentsFactory.$inject = ["$resource"];

	function appointmentsFactory($resource) {
		const Resource = $resource("/appointments/:id", {
			id: "@_id"
		}, {
			create: {
				method: "POST"
			},
			update: {
				method: "PUT",
			},
		});

		Resource.find = function(_q) {
			return Resource.query(_q).$promise;
		}

		Resource.prototype.$save = function() {
			this.$isWorking = true;
			return new Promise((resolve, reject) => {
				if (this._id) {
					this
						.$update()
						.then(resolve)
						.catch(reject)
						.finally(() => this.$isWorking = false);
				} else {
					this
						.$create()
						.then(resolve)
						.catch(reject)
						.finally(() => this.$isWorking = false);
				}
			});
		}

		Resource.prototype.$isWorking = false;

		return Resource;
	}
})();