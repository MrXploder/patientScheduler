(function(){
	'use strict';

	angular
	.module('angularApp')
	.controller('calendarDialogController', calendarDialogController);

	calendarDialogController.$inject = ["$scope"];

	function calendarDialogController($scope){
		let $ctrl = this;

		$ctrl.dayClickModel = null;

		activate();
		/////////////////////////////////

		function activate(){
		}

		$scope.$watch(() => this.dayClickModel, () => {
			if(!$ctrl.dayClickModel) return;
			/**
			 	If we dont do the evalAsync thing, Angula will trow an error of $$nextSibling undefined
			 	I dont know why, but it must be because we are nesting directives and ngDialog doesnt like it
			*/
			$scope.$evalAsync(() => $scope.confirm($ctrl.dayClickModel));
		})
	}
})();