// 加盐模块
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const mongoose = require("mongoose");
// 定义Schema
const adminSchema = new mongoose.Schema({
  nickname: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    set: val => {
      // 加密操作
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      // 生成加密密码
      const psw = bcrypt.hashSync(val, salt);
      return psw;
    }
  }
});
// 定义模型
const AdminModel = mongoose.model("Admin", adminSchema);
// 抛出
module.exports = AdminModel;
