const { response } = require('express');
const Product = require('../schema/schemaProducts');

const getProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    products.countDocuments(query),
    products.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    Product,
  });
};

const getProduct = async (req, res = response) => {
  const { id } = req.params;
  const products = await Product.findById(id);

  res.json(products);
};

const createProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name });

  if (productDB) {
    return res.status(400).json({
      msg: `the product ${productDB.name}, it already exists`,
    });
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

const uploadProduct = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const productDelete = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(productDelete);
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  uploadProduct,
  deleteProduct,
};
