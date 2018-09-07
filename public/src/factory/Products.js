(function(){
	'use strict';

	angular
	.module('angularApp')
	.factory('Products', productsFactory);

	productsFactory.$inject = ['$localResource', "$localStorage", "$resource", "$sessionStorage", "$http"];

	function productsFactory($localResource, $localStorage, $resource, $sessionStorage, $http){
		const _resourceName = "products";
		const Resource = $localResource(_resourceName);

		/*returns true or false if the local resource is empty (or not)*/
		Resource.$valid = function(){
			return !_.isEmpty($localStorage[_resourceName]);
		}

		/*get all the resource data from server given the branch_id and store it localStorage*/
		Resource.$pull = function(){
			return $http.get(`/${_resourceName}/branch/${$sessionStorage.currentUser.branch_id}`).then(function(response){
				return new Promise(function(resolve, reject){
					$localStorage[_resourceName] = response.data;
					resolve();
				});
			});
		}

		/*save all the resource data in the server given the branch_id*/
		/*this method should be called in a webworker periodically*/
		Resource.$push = function(){
			return $http.post(`/${_resourceName}/branch/${$sessionStorage.currentUser.branch_id}`, $localStorage[_resourceName])
		}

		/*this method gets all the resources from serverDB*/
		Resource.$findInServer = function(_q){
			const OriginResource = $resource("/products/:id", {id: "@_id"}, {create: {method: "POST"}, update: {method: "PUT"}});

			OriginResource.prototype.$save = function(){
				if(this._id) {
					return this.$update();
				}
				else {
					return this.$create();
				}
			}

			return OriginResource.query(_q).$promise;
		}


		return Resource;
	}
})();