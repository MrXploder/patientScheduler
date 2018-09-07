(function(angular){
	'use strict';

	angular
	.module('angularApp')
	.controller('homeController', homeController);

	homeController.$inject = ["$scope"];

	function homeController($scope){
		let $ctrl = this;

		activate();
		/////////////////////////////////////////////////////////

		function activate(){

		}
	}
})(angular);