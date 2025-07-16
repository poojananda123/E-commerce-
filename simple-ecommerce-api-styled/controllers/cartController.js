const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  const items = await CartItem.find({ userId: req.user.id }).populate('productId');
  res.json(items);
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const existing = await CartItem.findOne({ userId: req.user.id, productId });
  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return res.json(existing);
  }
  const item = new CartItem({ userId: req.user.id, productId, quantity });
  await item.save();
  res.status(201).json(item);
};

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const item = await CartItem.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
  res.json(item);
};

exports.removeCartItem = async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item removed from cart' });
};
