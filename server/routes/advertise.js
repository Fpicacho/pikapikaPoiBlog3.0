const jwtAuth = require("koa-jwt");
const AdvertiseController = require("../controller/advertise");
module.exports = router => {
  router.post(
    "/advertise",
    jwtAuth({ secret: global.config.security.securityKey }),
    AdvertiseController.createAdvertise
  );
  router.get("/advertise", AdvertiseController.getAdvertiseList);
  router.get("/advertise/:_id", AdvertiseController.getAdvertiseDetailById);
  router.put(
    "/advertise/:_id",
    jwtAuth({ secret: global.config.security.securityKey }),
    AdvertiseController.updateAdvertiseById
  );
  router.delete(
    "/advertise/:_id",
    jwtAuth({ secret: global.config.security.securityKey }),
    AdvertiseController.deleteAdvertiseById
  );
};
