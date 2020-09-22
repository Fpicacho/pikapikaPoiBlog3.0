const jwt = require("jsonwebtoken");
// 颁发令牌
const generateToken = function(_id) {
  const token = jwt.sign(
    {
      exp: global.config.security.exp,
      data: _id
    },
    global.config.security.securityKey
  );
  return token;
};
module.exports = {
  generateToken
};
