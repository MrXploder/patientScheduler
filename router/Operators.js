/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Operators Router File for Express
*@methods: GET, POST, PUT, DELETE.
*/
(function() {
  const OperatorsRouter  = require('express').Router();
  const OperatorsModel = require('../model/Operators');

  String.prototype.toObjectId = function(){
    let ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
  }

  /*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
  OperatorsRouter.param('operatorId', function(req, res, next){
    OperatorsModel.findById(req.params.operatorId).then(function(operator){
      req.item = operator;
      next();
    });
  });

  /*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
  OperatorsRouter.post('/', function(req, res, next){
    let item = new OperatorsModel(req.body);
    console.log(item);
    item.save().then(function(item){
      res.send(item);
    });
  });

  /*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
  OperatorsRouter.get('/', function(req, res, next){
    OperatorsModel.find({}).lean().then(function(operators){
      res.send(operators);
    });
  });

  /*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
  OperatorsRouter.get('/branch/:branch', function(req, res, next){
    OperatorsModel.find({branch_id: req.params.branch}).lean().then(function(operators){
      res.send(operators);
    });
  });

  /*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
  OperatorsRouter.route('/:operatorId')
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
  module.exports = OperatorsRouter;
})();