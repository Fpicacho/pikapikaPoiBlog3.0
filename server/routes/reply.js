const ReplyController = require("../controller/reply");
const jwtAuth = require("koa-jwt");
module.exports = router => {
  router.post("/reply", ReplyController.createReply);
  router.get("/reply", ReplyController.getReplyList);
  router.get("/reply/:_id", ReplyController.getReplyDetailById);
  router.put(
    "/reply/:_id",
    jwtAuth({ secret: global.config.security.securityKey }),
    ReplyController.updateReplyById
  );
  router.delete(
    "/reply/:_id",
    jwtAuth({ secret: global.config.security.securityKey }),
    ReplyController.deleteReplyById
  );
};
