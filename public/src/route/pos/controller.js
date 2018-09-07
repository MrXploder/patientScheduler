(function(angular){
	'use strict';

	angular
	.module('angularApp')
	.controller('posController', posController);

	posController.$inject = ["$scope", "$sessionStorage", "Invoices", "Products", "ngDialog", "$window", "$timeout", "Promotions"];

	function posController($scope, $sessionStorage, Invoices, Products, ngDialog, $window, $timeout, Promotions){
		let $ctrl  = this;
		let iFocus = false;

		$ctrl.invoice 		 = {};
		$ctrl.products     = [];
		$ctrl.invoiceModel = {barCode: "", productName: ""};
		$ctrl.addToInvoice = addToInvoice;
		$ctrl.payInvoice   = payInvoice;
		$ctrl.resetInvoice = resetInvoice;
		$ctrl.mustFocus    = mustFocus;
		$ctrl.isPaying		 = false;

		$scope.$on('$letterKeypressCustomEvent', letterKeypress);
		$scope.$on('$numberKeypressCustomEvent', numberKeypress);

		activate();
		//////////////////////////////////

		function activate(){
			Products.find({}).then(function(products){
				$ctrl.products = products;
			});

			instantiateInvoice();
		}

		/*we instantiate the Invoice with an array of promotions. This could be done in the Factory
		*but I rather prefer to pass it like a value to the constructor*/
		function instantiateInvoice(){
			Promotions.find({}).then(promotions => $ctrl.invoice = new Invoices({promotions}));
		}

		/*angular seems to pass variables by value and not by reference when they are in the view
		*so, even if we have the "model" variable and change its value, if we dont use the $ctrl prefixed
		*one, the variable will not change in the original reference.*/
		function addToInvoice(by, model){
			if(by === "byName"){
				let product = $ctrl.products.find(item => item.name === model);
				console.log(product);
				if(typeof product !== "undefined") $ctrl.invoice.$add(product);
			}

			else{
				let product = $ctrl.products.find(item => item.code === model);
				if(typeof product !== "undefined") $ctrl.invoice.$add(product);
			}

			$ctrl.invoiceModel = {barCode: "", productName: ""};
		}

		/*we create this function in case if we need to do somethig else in the future*/
		function resetInvoice(){
			activate();
		}

		/*open a modal an passe-it the $ctrl.invoice instance*/
		/*always use openConfirm because it injects the method confirm() to the $scope,
		*so the dialog acts as a promise*/
		function payInvoice(){
			$ctrl.isPaying = true;
			ngDialog.openConfirm({
				showClose: false,
				controller: "payDialogController",
				controllerAs: "$vm",
				templateUrl: "src/dialog/pay/template.html",
				data: $ctrl.invoice,
				showClose: true,
				closeByEscape: true,
			})
			.then(resetInvoice)
			.finally(() => $ctrl.isPaying = false);
		}

		function mustFocus(){
			return iFocus;
		}

		function letterKeypress(event){
			if($ctrl.invoiceModel.barCode !== ""){
				$ctrl.invoiceModel.productName = $ctrl.invoiceModel.barCode.slice(-1);
				$ctrl.invoiceModel.barCode = "";
			}
			else $ctrl.invoiceModel.barCode = "";
			iFocus = true;
			$scope.$apply();
		};

		function numberKeypress(event){
			if($ctrl.invoiceModel.productName !== ""){
				$ctrl.invoiceModel.barCode = $ctrl.invoiceModel.productName.slice(-1);
				$ctrl.invoiceModel.productName = "";
			}
			else $ctrl.invoiceModel.productName = "";
			iFocus = false;
			$scope.$apply();
		};
	}
})(angular);