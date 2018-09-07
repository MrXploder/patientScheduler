/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Branches Router File for Express
*@methods: GET, POST, PUT, DELETE.
*/
(function() {
  const BranchesRouter  = require('express').Router();
  const BranchesModel = require('../model/Branches');

  /*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
  BranchesRouter.param('branchId', function(req, res, next){
    BranchesModel.findById(req.params.branchId).then(function(branch){
      req.item = branch;
      next();
    });
  });

  /*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
  BranchesRouter.post('/', function(req, res, next){
    let item = new BranchesModel(req.body);
    console.log(item);
    item.save().then(function(item){
      res.send(item);
    });
  });

  /*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
  BranchesRouter.get('/', function(req, res, next){
    BranchesModel.find({}).lean().then(function(branches){
      res.send(branches);
    });
  });

  /*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
  BranchesRouter.route('/:branchId')
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
  module.exports = BranchesRouter;
})();