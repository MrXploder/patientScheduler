/**
	@author: MrXploder
	@url: https://mrxploder.github.io/MrXploder/
	@date: 08/2018
	@description: Operators DB Schema for Mongoose
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OperatorsSchema = new Schema({
	rut: {
		type: String,
		required: true
	},
	fullName: {
		type: String,
		required: true
	},
	nickName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	level: {
		type: Number,
		min: 1,
		max: 3,
	}
});

module.exports = mongoose.model('Operators', OperatorsSchema);