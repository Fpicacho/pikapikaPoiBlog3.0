const AdminController = require("../controller/admin");
const jwtAuth = require("koa-jwt");
module.exports = router => {
  router.prefix("/api/v1");
  router.post("/admin/register", AdminController.createAdmin);
  router.post("/admin/login", AdminController.login);
  router.get(
    "/admin/auth",
    jwtAuth({ secret: global.config.security.securityKey }),
    AdminController.getUseInfo
  );
};
