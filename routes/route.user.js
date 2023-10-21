const userController = require('../constrollers/user.controller');

const userRouter = require('express').Router();

userRouter.route('/')
    .get(userController.getAll)
    .post(userController.add)
    // Pour tout autre verbe http, la méthode all va renvoyer une erreur et donc interdire l'accès
    .all(((res, req) => {
        res.sendStatus(405);
    }));

userRouter.route('/:id')
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.delete)
    // Pour tout autre verbe http, la méthode all va renvoyer une erreur et donc interdire l'accès
    .all(((res, req) => {
        res.sendStatus(405);
    }));

module.exports = userRouter;