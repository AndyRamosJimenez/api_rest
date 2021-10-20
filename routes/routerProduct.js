const express = require('express');

const Products = require('../schema/schemaProducts');
const validatorHandler = require('../middleware/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schema/productSchema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const product = await Products.find();
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Products.findById({ _id: req.params.id });
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
});

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    try {
      const product = new Products(req.body);

      product.save();
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
    }
  }
);

router.put(
  '/:id',
  async (req, res) => {
    try {
      let product = await Products.findById({ _id: req.params.id });

      product = await Products.findByIdAndUpdate({ _id: req.params.id });

      res.json({ product });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el servidor');
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    await Products.findById(req.params.id);
    await Products.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Proyecto eliminado ' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
