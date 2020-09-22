const AdminModel = require("../models/AdminModel");
const { registerValidator, adminValidator } = require("../validators/admin");
const LoginManager = require("../services/login");
class AdminController {
  // 管理员注册
  static async createAdmin(ctx, next) {
    registerValidator(ctx);
    const { nickname, password } = ctx.request.body;
    const adminUser = await AdminModel.findOne({ nickname });
    if (adminUser) {
      throw new global.errs.Existing("ID已存在");
    }
    const admin = await AdminModel.create({
      nickname,
      password
    });
    // 返回结果
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: "success",
      errorCode: 0,
      admin
    };
  }
  static async login(ctx, next) {
    adminValidator(ctx);
    const { nickname, password } = ctx.request.body;
    const userInfo = await LoginManager.adminLogin({
      nickname,
      password
    });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: "登录成功",
      userInfo
    };
  }
  static async getUseInfo(ctx, next) {
    const _id = ctx.state.user.data;
    const userInfo = await AdminModel.findById({ _id });
    if (!userInfo) {
      throw new global.errs.AuthFailed("账户不存在或者密码错误");
    }
    ctx.stayus = 200;
    ctx.body = {
      _id: userInfo._id,
      nickname: userInfo.nickname
    };
  }
}
module.exports = AdminController;
