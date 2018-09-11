/**
  @author: MrXploder
  @url: https://mrxploder.github.io/MrXploder/
  @date: 08/2018
  @description: Doctors Router File for Express
  @methods: GET, POST, PUT, DELETE.
*/

const DoctorsRouter = require('express').Router();
const DoctorsModel = require('../model/Doctors');

/*INITIALIZE A PARAM THAT IS USED MULTIPLE TIMES*/
DoctorsRouter.param('doctorId', (req, res, next) => {
  DoctorsModel
    .findById(req.params.doctorId)
    .then(doctor => {
      req.item = doctor;
      next();
    });
});

/*DEFINE A GENERAL POST, NOT BINDED BY ANY ESPECIFIC ID*/
DoctorsRouter.post('/', (req, res, next) => {
  const item = new DoctorsModel(req.body);
  item
    .save()
    .then(item => res.send(item));
});

/*DEFINE A GENERAL GET, TO FETCH ALL THE RESOURCES FROM DB*/
DoctorsRouter.get('/', (req, res, next) => {
  DoctorsModel
    .find({})
    .lean()
    .then(doctors => res.send(doctors));
});

/*BASED ON PREVIUS ROUTER.PARAM, DEFINE GET, PUT AND DELETE FOR THAT PARAM*/
DoctorsRouter.route('/:doctorId')
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
module.exports = DoctorsRouter;