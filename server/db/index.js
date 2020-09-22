const mongoose = require("mongoose");
const config = require("../config");
const LikeModel = require("../models/LikeModel");
// 静态方法
class MongoDb {
  static connect() {
    mongoose.connect(
      // 链接数据库 mongodb://主机地址:端口号/数据库名
      `mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`,
      { useNewUrlParser: true, useUnifiedTopology: true } // 链接配置
    );
    mongoose.set("useFindAndModify", false); // 关闭警告
    const db = mongoose.connection; // 数据库链接
    db.on("error", console.error.bind(console, "connection error:")); // 打印错误
    db.once("open", async () => {
      console.log(`链接数据库成功！ ${config.db.port}`);
      console.log(
        `注意！本程序数据库完全动态生成，无需配置数据库，所以部分数据需要前端进行一次提交操作进行初始化`
      );
      console.log(`pikaPikaPoiBlog By:F_picaho`);
    });
  }
}
module.exports = MongoDb;
