const AdminModel = require("../models/AdminModel");
const { generateToken } = require("../core/util");
const bcrypt = require("bcrypt");
class LoginManager {
  static async adminLogin(params) {
    const { nickname, password } = params;
    const adminUser = await AdminModel.findOne({ nickname });
    const correct = bcrypt.compareSync(password, adminUser.password);
    if (!adminUser) {
      throw new global.errs.AuthFailed("账户不存在或密码错误！");
    }
    if (!correct) {
      throw new global.errs.AuthFailed("账号不存在或者密码不正确");
    }
    const token = generateToken(adminUser._id);
    return {
      nickname: adminUser.nickname,
      token
    };
  }
}
module.exports = LoginManager;
