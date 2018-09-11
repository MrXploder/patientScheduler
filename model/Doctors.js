/**
	@author: MrXploder
	@url: https://mrxploder.github.io/MrXploder/
	@date: 08/2018
	@description: Doctors DB Schema for Mongoose
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorsSchema = new Schema({
	rut: {
		type: String,
		required: true
	},
	fullName: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model('Doctors', DoctorsSchema);