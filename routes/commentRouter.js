let express = require("express");
let router = express.Router();

router.post("/", function (req, res, next) {
  let commentController = require("../controllers/commentController");
  let comment = {
    userId: 1,
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
