/**
  @author:      MrXploder
  @url:         https://mrxploder.github.io/MrXploder/
  @date:        08/2018
  @description:
  @methods:     POST.
*/

(function() {
  const _ = require('lodash');
  const AuthRouter = require('express').Router();
  const OperatorsModel = require('../model/Operators');

  AuthRouter.post('/', function(req, res, next) {
    OperatorsModel
      .findOne({
        nickName: req.body.nickName,
        password: req.body.password,
      })
      .then(function(operator) {
        if (Object.keys(operator).length === 0) throw ('error');
        else res.send(operator);
      })
      .catch(() => res.status(404).send(""));
  });

  /*EXPORT ROUTER*/
  module.exports = AuthRouter;
})();