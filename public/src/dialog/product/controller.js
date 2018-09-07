(function(){
	'use strict';

	angular
	.module('angularApp')
	.controller('productDialogController', productDialogController);

	productDialogController.$inject = ["$scope", "Products", "Branches"];

	function productDialogController($scope, Products, Branches){
		let $vm = this;

		$vm.product 		= $scope.ngDialogData || new Products({price: 0, stock: 0});
		$vm.saveChanges = saveChanges;

		activate();
		/////////////////////////////////

		function activate(){
			Branches.find({}).then(branch => {
				if(!$vm.product.branch_id) $vm.product.branch_id = branch[0]._id;
			});
		}

		function saveChanges(){
			$vm.product.$save().then(function(){
				console.log("saved successfuly");
				$scope.confirm();
			});
		}
	}
})();