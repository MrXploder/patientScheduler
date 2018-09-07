/*
*
* @author  "MrXploder"
* @date		 "May/2018"
* @about   ""
*
*/
(function(){
	'use strict';

	angular
	.module('angularApp')
	.run(startUp);

	startUp.$inject = ["$rootScope", "$localStorage", "$sessionStorage", "$state", "$window", "amMoment", "moment", "$timeout", "$interval", "ngNotify"];

	function startUp($rootScope, $localStorage, $sessionStorage, $state, $window, amMoment, moment, $timeout, $interval, ngNotify){
		/*do not expose internal flags*/
		let iRouteChanging = false;

		/*config angular-moment to use 'es' locale*/
		amMoment.changeLocale('es');

		/*config ngNotify*/
		/*I modify ngNotify so the padding bottom is the same as the navbar heigh*/
		ngNotify.config({
			theme: 'pure',
			position: 'top',
			duration: 1000,
			sticky: false,
			button: false,
			html: false
		});

		/*globals for easy access in all templates...
		*routescope are: $rs
		*route controllers are: $ctrl
		*dialog controllers are: $vm
		*directive controllers are: $vd
		*/
		/*$currentUser must be a function because of the angular digest cycle, if is a plain object
		*angular will initialize it once, but if its a function will call-it periodically, this must be
		*something about the ngStorage library.*/
		$rootScope.$rs = {
			$currentUser(){
				return $sessionStorage.currentUser;
			},
			$currentTime(format){
				return moment().format(format);
			},
			$isRouteChanging: false,
		};

		/*ticking clock*/
		$interval(function(){
			$rootScope.$rs.$currentTime = function(format){
				return moment().format(format);
			}
		}, 1000);

		/*catch all route changes at start*/
		/*We mainly do here is to catch if the user is not-logged-in and in the case if its true, redirect
		*it to the "login state". In every route definition must be a data->requireLogin-> true<->false method
		*so we know if that state he wants to go require login to access.*/
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			$rootScope.$rs.$isRouteChanging = true;
			if(toState.data.requireLogin && !$sessionStorage.currentUser){
				event.preventDefault();
				$state.go("login");
			}
		});

		/*catch all route changes at success*/
		/*this here is only for displaying a "preloader" div. In every "stateChangeStart" we
		*set a flag and when this event rises, we unset that flag. In view we use ng-hide to animate transitions
		*and rootscope because we are not binded by any controller*/
		$rootScope.$on('$stateChangeSuccess', function(){
			$timeout(function(){
				$rootScope.$rs.$isRouteChanging = false;
			}, 100);
		});

		/*dispatch an event to all child scopes how are interested in catch this special eventListener*/
		/*we do this way so we dont have to attach a eventListener in every scope.controller*/
		$window.addEventListener("keypress", function(event){
			/*fire event only with number keys*/
			if(event.which >= 48 && event.which <= 57){
				$rootScope.$broadcast('$numberKeypressCustomEvent');
			}
			/*fire event only with letters*/
			else if(event.which >= 97 && event.which <= 122){
				$rootScope.$broadcast('$letterKeypressCustomEvent');
			}
		});
	}
})();