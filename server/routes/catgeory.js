const CategoryController = require("../controller/category");
const jwtAuth = require("koa-jwt");
module.exports = router => {
  const secretKey = global.config.security.securityKey;
  router.post("/category", CategoryController.createCategory);
  router.get("/category", CategoryController.getCategoryList);
  router.put(
    "/category/:_id",
    jwtAuth({ secret: secretKey }),
    CategoryController.updateCategoryById
  );
  router.get("/category/:_id", CategoryController.getCategoryDetailById);
  router.delete(
    "/category/:_id",
    jwtAuth({ secret: secretKey }),
    CategoryController.deleteCategoryById
  );
};
