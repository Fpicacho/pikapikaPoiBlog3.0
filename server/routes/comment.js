const CommentController = require("../controller/comment");
const jwtAuth = require("koa-jwt");
module.exports = router => {
  router.post("/comment", CommentController.createComment);
  router.get("/comment", CommentController.getCommentList);
  router.get("/comment/:_id", CommentController.getCommentDetailById);
  router.put(
    "/comment/:_id",
    jwtAuth({ secret: global.config.security.securityKey }),
    CommentController.updateCommentDetailById
  );
  router.delete(
    "/comment/:_id",
    jwtAuth({ secret: global.config.security.securityKey }),
    CommentController.deleteCommentById
  );
};
