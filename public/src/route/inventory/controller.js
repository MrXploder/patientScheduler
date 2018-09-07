(function(){
	'use strict';

	angular
	.module('angularApp')
	.controller('inventoryController', inventoryController);

	inventoryController.$inject = ["$scope", "Products", "ngDialog", "ngNotify"];

	function inventoryController($scope, Products, ngDialog, ngNotify){
		let $ctrl = this;

		$ctrl.products = [];
		$ctrl.removeProduct = removeProduct;
		$ctrl.modifyProduct = modifyProduct;
		$ctrl.addProduct    = addProduct;

		activate();
		/////////////////////////////////

		function activate(){
			Products.find({}).then(products => {
				$ctrl.products = products;
				$ctrl.chart = {
					label: $ctrl.products.map(product => product.name),
					data: $ctrl.products.map(product => product.stock),
				}
				console.log($ctrl.chart);
			});
		}

		function removeProduct(product){
			product.$delete().then(() => {
				ngNotify.set("Eliminado", "error");
				activate();
			});
		}

		function modifyProduct(product){
			ngDialog.openConfirm({
				templateUrl: "src/dialog/product/template.html",
				controller: "productDialogController",
				controllerAs: "$vm",
				data: product,
				showClose: true,
				closeByEscape: true,
			})
			.then(() => {
				ngNotify.set("Modificado", "info");
				activate();
			})
			.catch(() => {
				activate();
			})
		}

		function addProduct(){
			ngDialog.openConfirm({
				templateUrl: "src/dialog/product/template.html",
				controller: "productDialogController",
				controllerAs: "$vm",
				showClose: true,
				closeByEscape: true,
			})
			.then(() => {
				ngNotify.set("Creado", "success");
				activate();
			});
		}
	}
})();