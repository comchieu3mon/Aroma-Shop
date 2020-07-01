let express = require("express");
let router = express.Router();
let Sequelize = require('sequelize');
let Op = Sequelize.Op;

router.post("/", function (req, res, next) {
    let reviewController = require("../controllers/reviewController");
    let review = {
      userId: 1,
      productId: req.body.productId,
      rating: req.body.rating,
      message: req.body.message,
    };    
    reviewController
      .add(review)
      .then(() => {
        res.redirect("/products/" + review.productId);
      })
      .catch((error) => next(new Error(error)));
  });

module.exports = router;