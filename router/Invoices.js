/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Invoices Router File for Express
*@methods: GET, POST, PUT, DELETE.
*/
const InvoicesRouter  = require('express').Router();
const InvoicesModel = require('../model/Invoices');

/*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
InvoicesRouter.param('invoiceId', function(req, res, next){
  InvoicesModel.findById(req.params.invoiceId).then(function(invoice){
    req.item = invoice;
    next();
  });
});

/*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
InvoicesRouter.post('/', function(req, res, next){
  let item = new InvoicesModel(req.body);
  item.save().then(function(item){
    res.send(item);
  });
});

/*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
InvoicesRouter.get('/', function(req, res, next){
  InvoicesModel.find({}).lean().then(function(invoices){
    res.send(invoices);
  });
});

/*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
InvoicesRouter.get('/branch/:branch', function(req, res, next){
  InvoicesModel.find({branch_id: req.params.branch}).lean().then(function(invoices){
    res.send(invoices);
  });
});

/*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
InvoicesRouter.route('/:invoiceId')
.get(function(req, res, next){
  res.send(req.item);
})
.put(function(req, res, next){
  req.item.set(req.body);
  req.item.save().then(function(item){
    res.send(item);
  });
})
.delete(function(req, res, next){
  req.item.remove().then(function(){
    res.send({});
  })
});

/*EXPORT ROUTER*/
module.exports = InvoicesRouter;