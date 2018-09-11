/*
  @author: MrXploder
  @url: https://mrxploder.github.io/MrXploder/
  @date: 08/2018
  @description: Appointments Router File for Express
  @methods: GET, POST, PUT, DELETE.
*/
const AppointmentsRouter = require('express').Router();
const AppointmentsModel = require('../model/Appointments');

/*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
AppointmentsRouter.param('appointmentId', (req, res, next) => {
  AppointmentsModel
    .findById(req.params.appointmentId)
    .then(appointment => {
      req.item = appointment;
      next();
    });
});

/*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
AppointmentsRouter.post('/', (req, res, next) => {
  const item = new AppointmentsModel(req.body);
  item
    .save()
    .then(item => res.send(item));
});

/*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
AppointmentsRouter.get('/', (req, res, next) => {
  AppointmentsModel
    .find({})
    .lean()
    .then(appointments => res.send(appointments));
});

/*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
AppointmentsRouter.route('/:appointmentId')
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
module.exports = AppointmentsRouter;