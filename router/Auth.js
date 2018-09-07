/*
*@author: MrXploder
*@url: https://mrxploder.github.io/MrXploder/
*@date: 08/2018
*@description:
*@methods: GET, POST, PUT, DELETE.
*/
(function() {
  const _ = require('lodash');
  const AuthRouter  = require('express').Router();
  const OperatorsModel = require('../model/Operators');
  const BranchesModel = require('../model/Branches');

  AuthRouter.post('/', function(req, res, next){
    let rut = req.body.rut,
    password = req.body.password;

    OperatorsModel.findOne({rut, password})
    .then(function(operator){
      if(_.isEmpty(operator)) throw('error');
      else res.send(operator);
    })
    .catch(() => res.status(404).send(""));
  });

  /*EXPORT ROUTER*/
  module.exports = AuthRouter;
})();