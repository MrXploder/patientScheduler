(function(){
	'use strict';

	angular
	.module('angularApp')
	.controller('accountingController', accountingController);

	accountingController.$inject = ["$scope"];

	function accountingController($scope){
		let $ctrl = this;


		activate();
		/////////////////////////////////

		function activate(){

		}
	}
})();