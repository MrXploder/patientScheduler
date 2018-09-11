(function() {
	'use strict';

	angular
		.module('angularApp')
		.directive('eventCalendar', eventCalendarDirective);

	function eventCalendarDirective() {
		return {
			template: "<div id='calendar'></div>",
			controller: "eventCalendarController",
			controllerAs: "$ctrl",
			replace: true,
			scope: {},
			bindToController: {
				dayClickModel: "=?",
			}
		}
	}
})();