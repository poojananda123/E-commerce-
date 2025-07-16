const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/', authenticate, authorize(['customer']), cartController.getCart);
router.post('/', authenticate, authorize(['customer']), cartController.addToCart);
router.put('/:id', authenticate, authorize(['customer']), cartController.updateCartItem);
router.delete('/:id', authenticate, authorize(['customer']), cartController.removeCartItem);

module.exports = router;
