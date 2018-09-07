d/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Categories Router File for Express
*@methods: GET, POST, PUT, DELETE.
*/
(function() {
  const CategoriesRouter  = require('express').Router();
  const CategoriesModel = require('../model/Categories');

  /*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
  CategoriesRouter.param('categoryId', function(req, res, next){
    CategoriesModel.findById(req.params.categoryId).then(function(category){
      req.item = category;
      next();
    });
  });

  /*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
  CategoriesRouter.post('/', function(req, res, next){
    let item = new CategoriesModel(req.body);
    console.log(item);
    item.save().then(function(item){
      res.send(item);
    });
  });

  /*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
  CategoriesRouter.get('/', function(req, res, next){
    CategoriesModel.find({}).lean().then(function(categories){
      res.send(categories);
    });
  });

  /*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
  CategoriesRouter.route('/:categoryId')
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
  module.exports = CategoriesRouter;
})();