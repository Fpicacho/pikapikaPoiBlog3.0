const LikeModel = require("../models/LikeModel");
const { Resolve } = require("../lib/helper");
const res = new Resolve();
class LikeController {
  static async addLike(ctx, next) {
    const isLike = await LikeModel.findOne({ __v: 0 });
    if (isLike === null) {
      await LikeModel.create({ like: 0 });
    } else {
      await LikeModel.updateOne({
        like: ++isLike.like
      });
      ctx.status = 200;
      ctx.body = res.success(isLike);
    }
  }
}
module.exports = LikeController;
