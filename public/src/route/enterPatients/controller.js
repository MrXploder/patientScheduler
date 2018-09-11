(function() {
	'use strict';

	angular
		.module('angularApp')
		.controller('enterPatientsController', enterPatientsController);

	enterPatientsController.$inject = ["$scope", "Operators", "Appointments", "Patients", "Doctors", "ngNotify", "ngDialog", "ngPrinter"];

	function enterPatientsController($scope, Operators, Appointments, Patients, Doctors, ngNotify, ngDialog, ngPrinter) {
		var $ctrl = this;

		$ctrl.Doctors = [];
		$ctrl.Patients = [];
		$ctrl.Operators = [];
		$ctrl.appointment = new Appointments();
		$ctrl.openEventCalendar = openEventCalendar;
		$ctrl.submitAppointment = submitAppointment;

		/**
		AngularJS doesnt initialize forms inmediatly,
		so if we want to log-it in the console, we need to watch-for-it
		*/
		//$ctrl.naForm;

		activate();
		//////////////////////////////////////////////////////////////////////

		function activate() {
			Operators
				.find({})
				.then(operators => $ctrl.Operators = operators);

			Patients
				.find({})
				.then(patients => $ctrl.Patients = patients);

			Doctors
				.find({})
				.then(doctors => $ctrl.Doctors = doctors);
		}

		function openEventCalendar() {
			ngDialog
				.openConfirm({
					templateUrl: "src/dialog/calendar/template.html",
					controller: "calendarDialogController",
					controllerAs: "$ctrl",
					width: "60%",
					showClose: true,
				})
				.then(timeStamp => {
					$ctrl.appointment.date = timeStamp.format("DD/MM/YYYY").toString();
					$ctrl.appointment.time = timeStamp.format("HH:mm").toString();
				});
		}

		function submitAppointment() {
			ngPrinter
				.print({
					templateUrl: "src/route/enterPatients/template.html",
				})
				.then(() => {
					console.log("printed!");
				});
		}

		/**
			Database only spects the patientId so, for the sake of human-name-autocomplete-like feature
			we watch for the input and search for it in the Patients object.
			If we have a match then we asign the patientId to the respective id, if doesnt then.... well.. it doesnt xdxd

			In the other hand, we doesnt need to do the search in the database, since we only have once instance of the app
			in the entire process... so, when an user creates a new patient, when he comes to this page, he will download
			the Patients object again with the new data and will fetch from there. Nobody else is going to modify the Patients
			database while this user is typing...
		*/
		$scope.$watch('$ctrl.appointment.patientFullName', patientFullName => {
			if (patientFullName) {
				const patient = $ctrl.Patients.find(patient => {
					if (patient.fullName === $ctrl.appointment.patientFullName) return patient;
				});

				if (patient) {
					$ctrl.appointment.patientId = patient._id;
					$ctrl.naForm.patientFullName.$setValidity('notfound', true);
				} else {
					$ctrl.appointment.patientId = "";
					$ctrl.naForm.patientFullName.$setValidity('notfound', false);
				}
			} else {
				$ctrl.appointment.patientId = "";
				$ctrl.naForm.patientFullName.$setValidity('notfound', false);
			}
		});
	}
})();