const userRouter = require('./route.user');
const router = require('express').Router();





router.use('/user',userRouter);


module.exports = router;