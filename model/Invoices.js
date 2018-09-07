/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Invoices DB Schema for Mongoose
*/
(function() {
	const mongoose = require('mongoose');
	const Schema = mongoose.Schema;

	const ProductListSchema = new Schema({
		product_id: {type: Schema.Types.ObjectId, ref: 'Products'},
		qty: Number,
	}, {_id: false});

	/*Do not explicit declare "_id". Let mongoose handle it by default.*/
	const InvoicesSchema = new Schema({
		branch_id: Schema.Types.ObjectId,
		operator_id: {type: Schema.Types.ObjectId, required: true, ref: 'Operators'},
		pay_amount: {type: Number, min: 0, required: true},
		product_list: [ProductListSchema],
	});

	module.exports = mongoose.model('Invoices', InvoicesSchema);
})();