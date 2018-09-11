/**
	@author: MrXploder
	@url: https://mrxploder.github.io/MrXploder/
	@date: 08/2018
	@description:
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentsSchema = new Schema({
	doctorId: Schema.Types.ObjectId,
	patientId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	operatorId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	date: String,
	time: String,
	sideNote: String,
	procedurePerform: String,
	injuryType: {
		type: String,
		enum: [
			"Simple",
			"Media",
			"Compleja",
			"Plana",
			"Otro",
		]
	},
	diagnosisCode: {
		type: String,
		enum: [
			"21-01-001",
			"21-01-002",
			"21-01-003",
			"21-05-001",
			"21-05-002",
			"21-05-003",
			"21-05-004",
			"21-05-005",
			"21-05-006",
			"21-05-007",
			"21-05-008",
			"21-05-009",
			"21-05-010",
			"21-05-011",
			"21-05-012",
			"21-05-013",
			"10-60-002",
			"10-00-000",
			"11-11-111",
		]
	},
	diagnosisSummary: String,
	operatorObservations: String,
	doctorObservations: String,
	healthInsurance: {
		type: String,
		enum: [
			"Fonasa A",
			"Fonasa B",
			"Fonasa C",
			"Fonasa D",
			"Isapre",
			"Capredena",
			"Otro",
		]
	},
	dischargeStatus: Boolean,
	dischargeReason: {
		type: String,
		enum: [
			"Alta Clinica",
			"Alta Administrativa",
			"Alta Inmediata",
		]
	},
	reasonToBe: String,
	patientOrigin: {
		type: String,
		enum: [
			"CAE Adulto",
			"Unidad de Emergencia Hospitalaria",
			"Pabellon de Yeso",
			"CAE Pediatrico",
			"Traumatologia",
			"Pensionados",
			"Ginecologia",
			"Pediatria",
			"Medicina",
			"UPC",
			"Otro",
		]
	},

});

module.exports = mongoose.model('Appointments', AppointmentsSchema);