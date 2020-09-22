module.exports = {
  devServer: {
    port: 2333, // 启动端口
    open: true, // 启动后是否自动打开网页
  },
  lintOnSave: process.env.NODE_ENV !== 'production'
};
