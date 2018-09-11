(function(angular) {
	'use strict';

	angular
		.module('angularApp')
		.controller('loginController', loginController);

	loginController.$inject = ["$scope", "Auth", "$state"];

	function loginController($scope, Auth, $state) {
		let $ctrl = this;

		$ctrl.loginForm = new Auth();
		$ctrl.loginCommit = loginCommit;

		activate();
		///////////////////////////////

		function activate() {

		}

		function loginCommit() {
			$ctrl.loginForm.$logIn().then(() => $state.go("home"));
		}
	}
})(angular);