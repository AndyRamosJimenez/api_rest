const express = require('express');
const router = express.Router();
const userService = require('../schema/UserSchema');
const validatorHandler = require('../middleware/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schema/UserSchema');

const service = new userService();

router.get('/user', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.json('na hay parametros');
  }
});

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json({ users });
});

router.post('/', async (req, res) => {
  validatorHandler(createUserSchema, 'body');
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
});
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body)
      res.json(user)
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const rta = await service.delete(id)
  res.json(rta)
})

module.exports = router;
