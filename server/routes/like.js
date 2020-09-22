const LikeController = require("../controller/Like");
module.exports = router => {
  router.post("/like", LikeController.addLike);
};
