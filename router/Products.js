/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Products Router File for Express
*@methods: GET, POST, PUT, DELETE.
*/
(function() {
  const ProductsRouter  = require('express').Router();
  const ProductsModel = require('../model/Products');

  /*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
  ProductsRouter.param('productId', function(req, res, next){
    ProductsModel.findById(req.params.productId).then(function(product){
      req.item = product;
      next();
    });
  });

  /*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
  ProductsRouter.post('/', function(req, res, next){
    let item = new ProductsModel(req.body);
    console.log(item);
    item.save().then(function(item){
      res.send(item);
    });
  });

  /*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
  ProductsRouter.get('/', function(req, res, next){
    ProductsModel.find({}).lean().then(function(products){
      res.send(products);
    });
  });

  /*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
  ProductsRouter.get('/branch/:branch', function(req, res, next){
    ProductsModel.find({branch_id: req.params.branch}).lean().then(function(products){
      res.send(products);
    });
  });

  /*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
  ProductsRouter.route('/:productId')
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
  module.exports = ProductsRouter;
})();