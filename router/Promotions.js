/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description: Promotions Router File for Express
*@methods: GET, POST, PUT, DELETE.
*/
(function() {
  const PromotionsRouter  = require('express').Router();
  const PromotionsModel = require('../model/Promotions');

  /*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
  PromotionsRouter.param('promotionId', function(req, res, next){
    PromotionsModel.findById(req.params.promotionId).then(function(promotion){
      req.item = promotion;
      next();
    });
  });

  /*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
  PromotionsRouter.post('/', function(req, res, next){
    let item = new PromotionsModel(req.body);
    console.log(item);
    item.save().then(function(item){
      res.send(item);
    });
  });

  /*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
  PromotionsRouter.get('/', function(req, res, next){
    PromotionsModel.find({}).lean().then(function(promotions){
      res.send(promotions);
    });
  });

  /*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
  PromotionsRouter.get('/branch/:branch', function(req, res, next){
    PromotionsModel.find({branch_id: req.params.branch}).lean().then(function(promotions){
      res.send(promotions);
    });
  });

  /*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
  PromotionsRouter.route('/:promotionId')
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
  module.exports = PromotionsRouter;
})();