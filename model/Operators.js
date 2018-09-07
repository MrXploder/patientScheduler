/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Operators DB Schema for Mongoose
*/
(function() {
	const mongoose = require('mongoose');
	const Schema = mongoose.Schema;

	/*Do not explicit declare "_id". Let mongoose handle it by default.*/
	const OperatorsSchema = new Schema({
		rut: {type: String, required: true},
		full_name: {type: String, required: true},
		nick_name: {type: String, required: true},
		password: {type: String, required: true},
		branch_id: Schema.Types.ObjectId,
		level: Number,
	});

	module.exports = mongoose.model('Operators', OperatorsSchema);
})();