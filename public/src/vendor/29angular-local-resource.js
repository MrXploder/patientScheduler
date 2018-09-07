(function() {
	'use strict';

	angular
	.module('angular-local-resource', ["ng", "ngStorage"])
	.factory('$localResource', localResource);

	localResource.$inject = ["$q", "$localStorage"];

	function localResource($q, $localStorage){
		function ResourceFactory(resource, defaults){
			if(typeof $localStorage[resource] === "undefined"){
				$localStorage[resource] = [];
			}

			function Resource(value) {
				shallowClearAndCopy(value || {}, this);
			}

			function shallowClearAndCopy(src, dst) {
				dst = dst || {};

				angular.forEach(dst, function(value, key) {
					delete dst[key];
				});

				for (var key in src) {
					if (src.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
						dst[key] = src[key];
					}
				}

				return dst;
			}

			function ObjectId(){
				var s = function (s) {
					return Math.floor(s).toString(16);
				};
				return s(Date.now() / 1000) + ' '.repeat(16).replace(/./g, function () {
					return s(Math.random() * 16);
				});
			}

			Resource.prototype.$save = function(){
				if (this._id) {
					return this.$update();
				}
				else {
					return this.$create();
				}
			}

			Resource.prototype.$create = function(){
				let self = this;
				return $q(function(resolve, reject){
					self._id = ObjectId();
					$localStorage[resource].push(self);
					console.log(self);
					resolve(self);
				});
			}

			Resource.prototype.$update = function(){
				let self = this;
				return $q(function(resolve, reject){
					let index = $localStorage[resource].findIndex(item => item._id === self._id);
					_.extend($localStorage[resource][index], self);
					resolve(self);
				});
			}

			Resource.prototype.$delete = function(){
				let self = this;
				return $q(function(resolve, reject){
					let index = $localStorage[resource].findIndex(item => item._id === self._id);
					$localStorage[resource].splice(index, 1);
					$localStorage[resource] = _.compact($localStorage[resource]);
					resolve();
				});
			}

			Resource.find = function(_d){
				return $q(function(resolve, reject){
					let data 			= _.filter($localStorage[resource], _d),
							instances = [];

					if(data.length > 0){
						for(let item of data){
							instances.push(new Resource(item));
						}
						resolve(instances);
					}
					else{
						reject();
					}

				});
			}

			return Resource;
		}

		return ResourceFactory;
	}
})();