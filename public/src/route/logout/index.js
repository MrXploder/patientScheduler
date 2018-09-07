(function(angular){
	'use strict';

	angular
	.module('angularApp')
	.controller('logoutController', logoutController);

	logoutController.$inject = ["$scope", "$sessionStorage", "$state"];

	function logoutController($scope, $sessionStorage, $state){
		let $ctrl = this;


		activate();
		/////////////////////////////////

		function activate(){
			delete $sessionStorage.currentUser;
			$state.go("home");
		}
	}
})(angular);