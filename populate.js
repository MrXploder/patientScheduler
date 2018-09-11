const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

/*MongoDB connection*/
mongoose.connect('mongodb://localhost:27017/patientScheduler', {
	useNewUrlParser: true
});
mongoose.Promise = require('bluebird');

const OperatorsModel = require('./model/Operators');

let operator = new OperatorsModel({
	_id: "5b7245b11111111111111111",
	rut: "178089986",
	fullName: "Luis Arancibia",
	nickName: "Luis",
	password: "root",
	level: 3,
});

let operator_two = new OperatorsModel({
	_id: "5b7245b22222222222222222",
	rut: "17203392K",
	fullName: "Viviana Ojeda",
	nickName: "Vivi",
	password: "root",
	level: 1,
});

Promise.all([operator.save(), operator_two.save()]).then(function() {
	console.log("Populated MongoDB Successfuly");
	process.exit();
});
/***********************************************/