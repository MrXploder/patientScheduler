(function(){
	'use strict';

	angular
	.module('angularApp')
	.factory('Auth', authFactory);

	authFactory.$inject = ["$http", "$localResource", "$localStorage", "$sessionStorage", "Operators", "Products", "Invoices", "Branches", "Promotions"];

	function authFactory($http, $localResource, $localStorage, $sessionStorage, Operators, Products, Invoices, Branches, Promotions){
		const $db = $localStorage;
		const Resource = function(){}

		Resource.prototype.$logIn = function(){
			let self = this;
			if(Operators.$valid()){
				return new Promise(function(resolve, reject){
					Operators.find({rut: self.rut, password: self.password}).then(function(user){
						$sessionStorage.currentUser = user[0];
						resolve();
					})
					.catch(() => reject());
				})
			}
			else{
				return $http.post("/auth", {rut: self.rut, password: self.password}).then(function(user){
					return new Promise(function(resolve, reject){
						$sessionStorage.currentUser = user.data;
						console.log("login successful");
						console.log("promotionsvalidity", Promotions.$valid());
						if(!Operators.$valid() || !Products.$valid() || !Invoices.$valid() || !Branches.$valid() || !Promotions.$valid()){
							console.log("LocalDB seems empty or defective. I will try to pull all the resources from ServerDB");

							Promise.all([Operators.$pull(), Products.$pull(), Invoices.$pull(), Branches.$pull(), Promotions.$pull()])
							.then(() => resolve())
							.catch(() => reject());
						}
						else{
							console.log("LocalDB seems fine");
							resolve();
						}
					});
				});
			}
		}

		return Resource;
	}
})();