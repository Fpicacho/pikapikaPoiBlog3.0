const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

const views = require("koa-views");
const co = require("co");
const convert = require("koa-convert");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const debug = require("debug")("koa2:server");
const path = require("path");

const config = require("./config");
const index = require("./routes");

const admin = require("./routes/admin");
const category = require("./routes/catgeory");
const like = require("./routes/like");
const article = require("./routes/article");
const comment = require("./routes/comment");
const reply = require("./routes/reply");
const advertise = require("./routes/advertise");

const port = process.env.PORT || config.port;
const cors = require("koa-cors");
const bouncer = require("koa-bouncer");
const errors = require("./core/http-exception");

global.config = config;
global.errs = errors;

// error handler
onerror(app);

const catchError = require("./middlewares/exception");
app.use(catchError);
// middlewares
app
  .use(bodyparser())
  .use(bouncer.middleware())
  .use(json())
  .use(cors())
  .use(logger())
  .use(require("koa-static")(__dirname + "/public"))
  .use(
    views(path.join(__dirname, "/views"), {
      options: { settings: { views: path.join(__dirname, "views") } },
      map: { hbs: "handlebars" },
      extension: "hbs"
    })
  )
  .use(router.routes())
  .use(router.allowedMethods());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - $ms`);
});

// 链接数据库
const mongoDb = require("./db/index");
mongoDb.connect();

// routes(router);
// 后端模板引擎
app.use(index.routes(), index.allowedMethods());
// 接口
admin(router);
category(router);
like(router);
article(router);
comment(router);
reply(router);
advertise(router);
app.on("error", function(err, ctx) {
  console.log(err);
  logger.error("server error", err, ctx);
});

module.exports = app.listen(config.port, () => {
  console.log(`服务器启动成功！ http://localhost:${config.port}`);
});
