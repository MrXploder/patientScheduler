/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Branches DB Schema for Mongoose
*/
(function() {
	const mongoose = require('mongoose');
	const Schema = mongoose.Schema;

	/*Do not explicit declare "_id". Let mongoose handle it by default.*/
	const BranchesSchema = new Schema({
		name: String,
		address: String,
		phone_number: Number,
	});

	module.exports = mongoose.model('Branches', BranchesSchema);
})();