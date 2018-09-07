/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Products DB Schema for Mongoose
*/
(function() {
	const mongoose = require('mongoose');
	const Schema = mongoose.Schema;

	/*Do not explicit declare "_id". Let mongoose handle it by default.*/
	const ProductsSchema = new Schema({
		name: {type: String, required: true},
		code: {type: String, required: true},
		stock: {type: Number, required: true, min: 0},
		price: {type: Number, required: true, min: 0},
		branch_id: Schema.Types.ObjectId,
	});

	module.exports = mongoose.model('Products', ProductsSchema);
})();