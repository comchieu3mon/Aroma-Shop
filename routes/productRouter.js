let express = require('express');
let router = express.Router();

router.get("/", function(req, res) {
    let categoryController = require('../controllers/categoryController');
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data;
            res.render("category")
        })
})

router.get("/:id", function(req, res) {
    res.render("single-product");
})

module.exports = router;