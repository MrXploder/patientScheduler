(function(angular){
	'use strict';

	angular
	.module('angularApp')
	.controller('loginController', loginController);

	loginController.$inject = ["$scope", "Auth", "$state"];

	function loginController($scope, Auth, $state){
		let $ctrl = this;

		$ctrl.form = new Auth();
		$ctrl.login = login;

		activate();
		///////////////////////////////

		function activate(){

		}

		function login(){
			console.log("trying to login", $ctrl.form);
			$ctrl.form.$logIn().then(() => {
				console.log("loginsuccessful->going home");
				$state.go("home");
			});
		}
	}
})(angular);