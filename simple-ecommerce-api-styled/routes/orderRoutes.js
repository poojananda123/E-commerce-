const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/', authenticate, authorize(['customer']), orderController.createOrder);
router.get('/', authenticate, orderController.getOrders);

module.exports = router;
