const express = require('express');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helper/generar-jwt');

const User = require('../schema/UserSchema');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/', (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.delete('/', (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
