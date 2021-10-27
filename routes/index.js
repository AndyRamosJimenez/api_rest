const express = require('express');

const productsRouter = require('./routerProduct');
const categoriesRouter = require('./categoresRouter');
const usersRouter = require('./usersRouter');
const loginRouter = require('./Login');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/login', loginRouter);
}

module.exports = routerApi;
