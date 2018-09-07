(function(){
	'use strict';

	angular
	.module('angularApp')
	.controller('salesController', salesController);

	salesController.$inject = ["$scope", "Products", "Invoices", "Promotions"];

	function salesController($scope, Products, Invoices, Promotions){
		let $ctrl = this;

		$ctrl.products 	 = [];
		$ctrl.invoices 	 = [];
		$ctrl.promotions = [];

		activate();
		/////////////////////////////////

		function activate(){
			Promise.all([Products.find({}), Invoices.find({}), Promotions.find({})]).then(response => {
				$ctrl.products   = response[0];
				$ctrl.invoices   = response[1];
				$ctrl.promotions = response[2];

				updateProductSelledAmount();
			});
		}

		function updateProductSelledAmount(){
			_($ctrl.products).forEach(function(product){
				product.sell_amount = 0;
				_($ctrl.invoices).forEach(function(invoice){
					let acumulation = _(invoice.product_list).reduce(function(accumulator, item){
						if(item.product_id === product._id) return accumulator + item.qty;
						else return accumulator;
					}, 0);
					product.sell_amount += acumulation;
				});
			});
			console.log("lista de productos-->", $ctrl.products);
			console.log("lista de boletas-->", $ctrl.invoices);
		}
	}
})();