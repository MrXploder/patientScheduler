const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

/*LiveReaload section*/
var livereload = require('livereload');
var server = livereload.createServer();
server.watch(__dirname + "/public");

/*MongoDB connection*/
mongoose.connect('mongodb://localhost:27017/patientScheduler', {
	useNewUrlParser: true
});
mongoose.Promise = require('bluebird');

/*Parse all the requests body's with bodyParser and return a JSON*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

/**
	Make the folder "public" a static asset folder.
*/
app.use('/', express.static(path.join(__dirname, 'public')));

/**
	Redirect if route doesnt exist.
*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

/*Routes definitions for the rest-api goes here*/
app.use('/auth', require('./router/Auth'));
app.use('/appointments', require('./router/Appointments'));
app.use('/operators', require('./router/Operators'));
app.use('/patients', require('./router/Patients'));
app.use('/doctors', require('./router/Doctors'));

/*Start the server*/
app.listen(80);
console.log('Stack Running at port 80...');