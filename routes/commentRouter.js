let express = require("express");
let router = express.Router();
let userController = require('../controllers/userController');

router.post("/", userController.isLoggedIn,function (req, res, next) {
  let commentController = require("../controllers/commentController");
  let comment = {
    userId: req.session.user.id,
    productId: req.body.productId,
    message: req.body.message,
  };
  if (!isNaN(req.body.parentCommentId) && req.body.parentCommentId != "") {
    comment.parentCommentId = req.body.parentCommentId;
  }
  console.log(comment);
  commentController
    .add(comment)
    .then((data) => {
      res.redirect("/products/" + data.productId);
    })
    .catch((error) => next(new Error(error)));
});

module.exports = router;
