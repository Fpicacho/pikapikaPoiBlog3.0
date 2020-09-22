module.exports = {
  // 全局配置
  port: 5000,
  db: {
    port: 27017,
    host: "localhost",
    dbName: "pikapikapoiBlog"
  },
  security: {
    securityKey: "securityKey",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
  }
};
