(function(){
	'use strict';

	angular
	.module('angularApp')
	.factory('Invoices', invoicesFactory);

	invoicesFactory.$inject = ['$localResource', "$localStorage", "$resource", "$sessionStorage", "$http", "Promotions"];

	function invoicesFactory($localResource, $localStorage, $resource, $sessionStorage, $http, Promotions){
		const _resourceName = "invoices";
		const Resource = $localResource(_resourceName);

		///////////
		/*HELPERS*/
		///////////

		/*returns true or false if the local resource is empty (or not)*/
		Resource.$valid = function(){
			return !_.isEmpty($localStorage[_resourceName]);
		}

		/*get all the resource data from server given the branch_id and store it localStorage*/
		Resource.$pull = function(){
			return $http.get(`/${_resourceName}/branch/${$sessionStorage.currentUser.branch_id}`).then(function(response){
				return new Promise(function(resolve, reject){
					$localStorage[_resourceName] = response.data;
					resolve();
				});
			});
		}

		/*save all the resource data in the server given the branch_id*/
		/*this method should be called in a webworker periodically*/
		Resource.$push = function(){
			return $http.post(`/${_resourceName}/branch/${$sessionStorage.currentUser.branch_id}`, $localStorage[_resourceName])
		}

		/*this method gets all the resources from online DB*/
		Resource.$findInServer = function(_q){
			const OriginResource = $resource("/invoices/:id", {id: "@_id"}, {create: {method: "POST"}, update: {method: "PUT"}});

			OriginResource.prototype.$save = function(){
				let self = this;

				self.product_list.forEach(function(item, index, array){
					self.product_list[index]._id = angular.copy(self.product_list[index]._id);
				});

				if(!self.operator_id) self.operator_id = $sessionStorage.currentUser._id;

				if(this._id) {
					return this.$update();
				}
				else {
					return this.$create();
				}
			}

			return OriginResource.query(_q).$promise;
		}

		//////////////////////
		/*PROTOTYPE WHEN NEW*/
		//////////////////////

		/*calculates the subtotal of the invoice -> the sum of all the products prices*/
		Resource.prototype.$getSubTotal = function(){
			if(!this.product_list) this.product_list = [];
			return _.reduce(this.product_list, (total, item) => total += item.price * item.qty, 0);
		}

		/*calculates the subtotal taxes multiplying it by 0.19 I.V.A*/
		Resource.prototype.$getTaxes = function(){
			return (this.$getSubTotal() - this.$getDiscounts()) * 0.19;
		}

		/*calculates the discounts based on "Promotions" list*/
		Resource.prototype.$getDiscounts = function(){
			let self = this;
			let accumulator = 0;
			let toSend = [];

			_(self.promotions).forEach(function(promotion){
				_(promotion.product_list).forEach(function(productInPromotion){
					let product = _.find(self.product_list, function(el){
						return (el.qty >= productInPromotion.qty && el._id === productInPromotion._id);
					});
					if(product){
						toSend.push(promotion.name);
						accumulator += (product.price * productInPromotion.qty) * (promotion.discount / 100);
					}
				});
			});

			Resource.prototype.$getDiscountsList = toSend.join(' - ');
			return accumulator;
		}

		/*calculates the overall invoice total*/
		Resource.prototype.$getTotal = function(){
			return (this.$getSubTotal() - this.$getDiscounts()) + this.$getTaxes() ;
		}

		/*calculates the difference between paying amount and total invoice.*/
		Resource.prototype.$getChange = function(){
			if(!this.pay_amount) this.pay_amount = 0;
			if(this.$isValid()) return this.pay_amount - this.$getTotal();
			else return 0;
		}

		/*checks if the input "pay_amount" is equal or greater than the invoice total*/
		Resource.prototype.$isValid = function(){
			return (this.pay_amount >= this.$getTotal());
		}

		/*adds a product to the current invoice productlist, _d param must be a valid product object*/
		Resource.prototype.$add = function(_d){
			if(!this.product_list) this.product_list = [];
			let index = _.findIndex(this.product_list, ['_id', _d._id]);
			if(index >= 0) this.product_list[index].qty++;
			else {
				_d.qty = 1;
				this.product_list.push(_d);
			}
		}

		/*calculates the total amount of products in the invoice product list*/
		Resource.prototype.$length = function(){
			if(!this.product_list) this.product_list = [];
			return _.reduce(this.product_list, (total, item) => total += item.qty, 0);
		}

		/*removes a product from the product list given the product object*/
		Resource.prototype.$remove = function(_d){
			if(!this.product_list) this.product_list = [];
			this.product_list.splice(this.product_list.indexOf(_d), 1);
		}

		/*increase by one, the product in productlist given the product object*/
		Resource.prototype.$plusOne = function(_d){
			if(!this.product_list) this.product_list = [];
			this.product_list[this.product_list.indexOf(_d)].qty++;
		}

		/*decreases by one, the product in productlist given the product object*/
		Resource.prototype.$minusOne = function(_d){
			if(!this.product_list) this.product_list = [];
			if(this.product_list[this.product_list.indexOf(_d)].qty > 1) this.product_list[this.product_list.indexOf(_d)].qty--;
		}

		return Resource;
	}
})();