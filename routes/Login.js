const express = require('express');
const UserEmail = require('../schema/UserSchema');
const AuthService = require('../services/auth.service');
const { config } = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const service = new AuthService();

router.post('/login', async (req, res, next) => {
  try {
    const body = req.body;
    const email = new UserEmail(body);
    email.save();
    res.json(email);
  } catch (error) {
    next(error);
    res.status(500).send('Hubo un error');
  }
});

router.get('/', async (req, res, next) => {
  try {
    const user = await UserEmail.find(req.query);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserEmail.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await UserEmail.update(id, body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await UserEmail.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
