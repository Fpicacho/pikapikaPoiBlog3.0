const jwtAuth = require("koa-jwt");
const ArticleController = require("../controller/article");
const upload = require("../middlewares/upload");
module.exports = (router) => {
  const secretKey = global.config.security.securityKey;
  router.post(
    "/article",
    jwtAuth({ secret: secretKey }),
    ArticleController.createArticle
  );
  router.get("/article", ArticleController.getArticleList);
  router.put(
    "/article/:_id",
    jwtAuth({ secret: secretKey }),
    ArticleController.updateArticle
  );
  router.get("/article/:_id", ArticleController.getArticleDetail);
  router.delete(
    "/article/:_id",
    jwtAuth({ secret: secretKey }),
    ArticleController.deleteArticle
  );
  router.post(
    "/upload",
    upload.single("avatar"),
    ArticleController.uploadCoverImg
  );
};
