const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
  like: {
    type: Number,
    default: 0
  }
});

const LikeModel = mongoose.model("Like", likeSchema);
module.exports = LikeModel;
