(function() {
	'use strict';

	angular
		.module('angularApp')
		.controller('eventCalendarController', eventCalendarController);

	eventCalendarController.$inject = ["Appointments", "$scope", "$timeout"];

	function eventCalendarController(Appointments, $scope, $timeout) {
		let $vd = this;

		$vd.dayClickModel = "";

		activate();
		//////////////////////////////////////////////////////

		function activate() {
			Appointments
				.find({})
				.then(appointments => {
					let _events = appointments.map(item => ({
						title: item.patient_fullname,
						start: moment(`${item.date} ${item.time}`, "DD/MM/YYYY HH:mm"),
						end: moment(`${item.date} ${item.time}`, "DD/MM/YYYY HH:mm").add(30, 'm'),
						color: item.status === "done" ? '#4caf50' : item.status === "absent" ? '#f44336' : '#ffc107',
					}));

					/**
					An empty timeout is like telling AngularJS -> hey!, wait for the next digest cycle and then do this ;)
					*/
					$timeout(function() {
						$('#calendar').fullCalendar({
							events: _events,
							weekends: false,
							nowIndicator: true,
							height: "auto",
							allDaySlot: false,
							slotDuration: "00:30:00",
							minTime: "08:30:00",
							maxTime: "17:00:00",
							slotLabelInterval: "00:30:00",
							businessHours: [{
								dow: [1, 2, 3, 4, 5],
								start: "08:30",
								end: "13:00",
							}, {
								dow: [1, 2, 3, 4, 5],
								start: "14:30",
								end: "17:00",
							}],
							defaultView: 'agendaWeek',
							header: {
								left: 'prev,next today',
								center: 'title',
								right: 'agendaWeek,agendaDay'
							},
							dayClick(date, jsEvent, view) {
								/**
									We must apply our changes because dayClickModel is outside from this scope
								*/
								$vd.dayClickModel = date;
								$scope.$apply();
							},
						});
					});
				});
		}
	}
})();