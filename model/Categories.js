/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Categories DB Schema for Mongoose
*/
(function() {
	const mongoose = require('mongoose');
	const Schema = mongoose.Schema;

	/*Do not explicit declare "_id". Let mongoose handle it by default.*/
	const CategoriesSchema = new Schema({
		name: "String",
	});

	module.exports = mongoose.model('Categories', CategoriesSchema);
})();