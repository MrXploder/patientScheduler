/**
  @author: MrXploder
  @url: https://mrxploder.github.io/MrXploder/
  @date: 08/2018
  @description: Operators Router File for Express
  @methods: GET, POST, PUT, DELETE.
*/

const OperatorsRouter = require('express').Router();
const OperatorsModel = require('../model/Operators');

/*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
OperatorsRouter.param('operatorId', (req, res, next) => {
  OperatorsModel
    .findById(req.params.operatorId)
    .then(operator => {
      req.item = operator;
      next();
    });
});

/*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
OperatorsRouter.post('/', (req, res, next) => {
  const item = new OperatorsModel(req.body);
  item
    .save()
    .then(item => res.send(item));
});

/*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
OperatorsRouter.get('/', (req, res, next) => {
  OperatorsModel
    .find({})
    .lean()
    .then(operators => res.send(operators));
});

/*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
OperatorsRouter.route('/:operatorId')
  .get((req, res, next) => {
    res.send(req.item);
  })
  .put((req, res, next) => {
    req
      .item
      .set(req.body);
    req
      .item
      .save()
      .then(item => res.send(item));
  })
  .delete((req, res, next) => {
    req
      .item
      .remove()
      .then(() => res.send({}));
  });

/*EXPORT ROUTER*/
module.exports = OperatorsRouter;