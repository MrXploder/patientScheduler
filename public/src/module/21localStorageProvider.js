(function(){
	'use strict';

	angular
	.module('angularApp')
	.config(angularStorageProvider);

	angularStorageProvider.$inject  = ["$localStorageProvider", "$sessionStorageProvider"];

	function angularStorageProvider($localStorageProvider, $sessionStorageProvider){
		$localStorageProvider.setKeyPrefix('PointOfSale-');
		$sessionStorageProvider.setKeyPrefix('PointOfSale-');
	}
})();