const express = require('express');
const AuthService = require('../services/auth.service');
const passport = require('passport');
const service = new AuthService();
const router = express();

router.post('/', async (req, res, next) => {
  try {
    const user = req.user;
    res.json(service.signToken(user));
  } catch (error) {
    next(error);
  }
});

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendEmail(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/change-password',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { newPassword, token } = req.user;
      res.json(service.changePassword(newPassword, token));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
