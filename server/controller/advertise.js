const AdvertiseModel = require("../models/AdvertiseModel");
const { advertiseValidator } = require("../validators/advertise");
const { Resolve } = require("../lib/helper");
const res = new Resolve();
class ReplyController {
  static async createAdvertise(ctx, next) {
    advertiseValidator(ctx);
    const { title } = ctx.request.body;
    let hasAdvertise = await AdvertiseModel.findOne({ title });
    if (hasAdvertise) {
      throw new global.errs.Existing("广告已存在");
    }
    let advertise = await AdvertiseModel.create(ctx.request.body);
    ctx.body = res.json(advertise);
  }
  static async getAdvertiseList(ctx, next) {
    let advertiseList = await AdvertiseModel.find();
    ctx.status = 200;
    ctx.body = res.json(advertiseList);
  }
  static async getAdvertiseDetailById(ctx, next) {
    let _id = ctx.params._id;
    let advertiseDetail = await AdvertiseModel.findById({ _id }).lean();
    if (!advertiseDetail) {
      throw new global.errs.NotFound("此广告不存在");
    }
    ctx.status = 200;
    ctx.body = res.json(advertiseDetail);
  }
  static async updateAdvertiseById(ctx, next) {
    let _id = ctx.params._id;
    let advertise = await AdvertiseModel.findByIdAndUpdate(
      { _id },
      ctx.request.body
    ).lean();
    if (!advertise) {
      throw new global.errs.NotFound("此广告不存在");
    }
    ctx.status = 200;
    ctx.body = res.success("更新广告成功");
  }
  static async deleteAdvertiseById(ctx, next) {
    let _id = ctx.params._id;
    let advertise = await AdvertiseModel.findByIdAndDelete({ _id });
    if (!advertise) {
      throw new global.errs.NotFound("此广告不存在");
    }
    ctx.status = 200;
    ctx.body = res.success("删除广告成功");
  }
}
module.exports = ReplyController;
