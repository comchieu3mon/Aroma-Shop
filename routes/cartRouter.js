let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
    var cart = req.session.cart;
    res.locals.cart = cart.getCart();
    res.render("cart");
});

router.post('/', function(req, res, next) {
    var productId = req.body.id;
    var quantity = isNaN(req.body.quantity) ? 1 : req.body.quantity;
    var productController = require('../controllers/productController');
    productController
        .getById(productId)
        .then(product => {
            var cartItem = req.session.cart.add(product, productId, quantity);
            res.json(cartItem);
        })
        .catch(error => next(new Error(error)));
})

module.exports = router;