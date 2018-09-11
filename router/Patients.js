/*
 *@author: MrXploder
 *@url: https://mrxploder.github.io/MrXploder/
 *@date: 08/2018
 *@description: Patients Router File for Express
 *@methods: GET, POST, PUT, DELETE.
 */
(function() {
  const PatientsRouter = require('express').Router();
  const PatientsModel = require('../model/Patients');

  /*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
  PatientsRouter.param('patientId', (req, res, next) => {
    PatientsModel
      .findById(req.params.patientId)
      .then(patient => {
        req.item = patient;
        next();
      });
  });

  /*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
  PatientsRouter.post('/', (req, res, next) => {
    const item = new PatientsModel(req.body);
    item
      .save()
      .then(item => res.send(item));
  });

  /*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
  PatientsRouter.get('/', (req, res, next) => {
    PatientsModel
      .find({})
      .lean()
      .then(patients => res.send(patients));
  });

  /*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
  PatientsRouter.route('/:patientId')
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
  module.exports = PatientsRouter;
})();