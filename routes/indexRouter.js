let express = require('express');
let router = express.Router();

router.get("/", function(req, res) {
    let categoryController = require('../controllers/categoryController');
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data;
            console.log(data);
            res.render("index");
        })
        .catch(error => new Error(error))
});

module.exports = router;