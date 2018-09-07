const express    = require('express');
const path       = require('path');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const app				 = express();

/*MongoDB connection*/
mongoose.connect('mongodb://localhost:27017/PointOfSale', { useNewUrlParser: true });
mongoose.Promise = require('bluebird');

const BranchModel = require('./model/Branches');
const ProductsModel = require('./model/Products');
const OperatorsModel = require('./model/Operators');
const InvoicesModel = require('./model/Invoices');
const PromotionsModel = require('./model/Promotions');

let branch = new BranchModel({
	_id: "5b7245b00000000000000000",
	name: "Botilleria Villa Alemana",
	address: "Victoria #186",
	phone_number: 56957139808,
});

let operator = new OperatorsModel({
	_id: "5b7245b11111111111111111",
	rut: "178089986",
	full_name: "Luis Arancibia",
	nick_name: "Luis",
	password: "root",
	branch_id: "5b7245b00000000000000000",
	level: 3,
});

let operator_two = new OperatorsModel({
	_id: "5b7245b22222222222222222",
	rut: "17203392K",
	full_name: "Viviana Ojeda",
	nick_name: "Vivi",
	password: "root",
	branch_id: "5b7245b00000000000000000",
	level: 1,
});

let product = new ProductsModel({
	_id: "5b73c7b6ed191932a868b042",
	name: "Cerveza Escudo 1.2LT",
	code: "7802100020130",
	stock: 100,
	price: 900,
	branch_id: "5b7245b00000000000000000"
});

let invoice = new InvoicesModel({
	operator_id: "5b7245b11111111111111111",
	pay_amount: 3000,
	product_list: [{
		product_id: "5b73c7b6ed191932a868b042",
		qty: 1
	}],
	branch_id: "5b7245b00000000000000000",
});

let promotion = new PromotionsModel({
	branch_id: "5b7245b00000000000000000",
	name: "La Terrible Promo",
	product_list: [{
		product_id: "5b73c7b6ed191932a868b042",
		qty: 2,
	}],
	discount: 50,
});

Promise.all([branch.save(), operator.save(), operator_two.save(), product.save(), invoice.save(), promotion.save()]).then(function(){
	console.log("Populated MongoDB Successfuly");
	process.exit();
});
/***********************************************/