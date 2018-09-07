const express    = require('express');
const path       = require('path');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const app				 = express();

var livereload = require('livereload');
var server = livereload.createServer();
server.watch(__dirname + "/public");

/*MongoDB connection*/
mongoose.connect('mongodb://localhost:27017/PointOfSale', { useNewUrlParser: true });
mongoose.Promise = require('bluebird');

/*Parse all the requests body's with bodyParser and return a JSON*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*Make the folder "public" a static asset folder*/
app.use('/', express.static(path.join(__dirname, 'public')));

/*Routes definitions for the rest-api goes here*/
app.use('/operators', require('./router/Operators'));
app.use('/products', require('./router/Products'));
app.use('/promotions', require('./router/Promotions'));
app.use('/invoices', require('./router/Invoices'));
app.use('/branches', require('./router/Branches'));
app.use('/auth', require('./router/Auth'));
/***********************************************/

/*Start the server*/
app.listen(80);
console.log('PointOfSale Stack Running at port 80...');