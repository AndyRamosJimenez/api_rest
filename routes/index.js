const express = require('express');

const productsRouter = require('./routerProduct');
const categoriesRouter = require('./categoresRouter');
const usersRouter = require('./usersRouter');
const loginRouter = require('./Login');
const userRouter = require('./user')

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/auth', loginRouter);
  router.use("/user", userRouter);
}

module.exports = routerApi;
