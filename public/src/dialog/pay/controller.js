(function(){
	'use strict';

	angular
	.module('angularApp')
	.controller('payDialogController', payDialogController);

	payDialogController.$inject = ["$scope"];

	function payDialogController($scope){
		let $vm = this;

		$vm.invoice = $scope.ngDialogData;
		$vm.commit  = commit;

		activate();
		///////////////////////////////////

		function activate(){
		}

		function commit(){
			$vm.invoice.$save().then(function(response){
				$scope.confirm(response);
			})
			.catch(function(response){
				console.log("error--->", response);
			})
		}
	}
})();