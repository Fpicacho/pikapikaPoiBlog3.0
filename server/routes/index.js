const Router = require("koa-router");
const router = new Router();
router.get("/", async function(ctx, next) {
  ctx.state = {
    title: "F_picacho"
  };
  ctx.body = ctx.state;
  await ctx.render("index", ctx.state);
});
module.exports = router;
