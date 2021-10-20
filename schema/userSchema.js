const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(15);

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  lastName: lastName,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
