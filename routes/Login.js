const express = require('express');
const AuthService = require('../services/auth.service');
const passport = require('passport');
const service = new AuthService();
const router = express();

router.post(
  '/',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
