const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const cartItems = await CartItem.find({ userId: req.user.id });
  if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

  let total = 0;
  const items = [];

  for (let item of cartItems) {
    const product = await Product.findById(item.productId);
    total += product.price * item.quantity;
    items.push({ productId: item.productId, quantity: item.quantity });
  }

  const order = new Order({ userId: req.user.id, items, total });
  await order.save();
  await CartItem.deleteMany({ userId: req.user.id });

  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
  res.json(orders);
};
