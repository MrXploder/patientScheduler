(function() {
	'use strict';

	angular
		.module('angularApp')
		.config(uiRouterProvider);

	uiRouterProvider.$inject = ["$stateProvider", "$urlRouterProvider"];


	function uiRouterProvider($stateProvider, $urlRouterProvider) {
		let requireBeforeChange = {
			requireLogin: true,
		};

		/*redirect to home if user loads a no-routed page e.x: host without '#'  */
		$urlRouterProvider.when('', '/home');
		/*if state does not exists, redirect to home*/
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state("login", {
				url: "/login",
				templateUrl: "src/route/login/template.html",
				controller: "loginController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: false
				},
			})
			.state("logout", {
				url: "/logout",
				controller: "logoutController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: false
				},
			})
			.state('home', {
				url: '/home',
				templateUrl: "src/route/home/template.html",
				controller: "homeController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: true
				},
			})
			.state("config", {
				url: "/config",
				templateUrl: "src/route/config/template.html",
				controller: "configController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: true
				},
			})
			.state("enterPatients", {
				url: "/enterPatients",
				templateUrl: "src/route/enterPatients/template.html",
				controller: "enterPatientsController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: true
				}
			})
			.state("controlList", {
				url: "/controlList",
				templateUrl: "src/route/controlList/template.html",
				controller: "controlListController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: true
				}
			})
			.state("daySchedule", {
				url: "/daySchedule",
				templateUrl: "src/route/daySchedule/template.html",
				controller: "dayScheduleController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: true
				}
			})
			.state("monthSchedule", {
				url: "/monthSchedule",
				templateUrl: "src/route/monthSchedule/template.html",
				controller: "monthScheduleController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: true
				}
			})
			.state("medicsManagement", {
				url: "/medicsManagement",
				templateUrl: "src/route/medicsManagement/template.html",
				controller: "medicsManagementController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: true
				}
			})
			.state("patientsManagement", {
				url: "/patientsManagement",
				templateUrl: "src/route/patientsManagement/template.html",
				controller: "patientsManagementController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: true
				}
			}).state("operatorsManagement", {
				url: "/operatorsManagement",
				templateUrl: "src/route/operatorsManagement/template.html",
				controller: "operatorsManagementController",
				controllerAs: "$ctrl",
				data: {
					requireLogin: true
				}
			})
	}
})();