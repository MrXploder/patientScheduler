/**
	@author: MrXploder
	@url: https://mrxploder.github.io/MrXploder/
	@date: 08/2018
	@description: Patients DB Schema for Mongoose
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientsSchema = new Schema({
	rut: {
		type: String,
		required: true
	},
	fullName: {
		type: String,
		required: true
	},
	allergies: Boolean,
	phoneNumber: [Number],
});

module.exports = mongoose.model('Patients', PatientsSchema);