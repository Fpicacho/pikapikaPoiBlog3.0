const ReplyModel = require("../models/ReplyModel");
const CommentModel = require("../models/CommentModel");
const { replyValidator } = require("../validators/reply");
const { Resolve } = require("../lib/helper");
const res = new Resolve();

class ReplyController {
  static async createReply(ctx, next) {
    replyValidator(ctx);
    const { comment_id } = ctx.request.body;
    const comment = await CommentModel.findById({ _id: comment_id });
    if (!comment) {
      throw new global.errs.NotFound("没有找到相关评论");
    }
    const reply = await ReplyModel.create(ctx.request.body);
    ctx.body = res.json(reply);
  }
  static async getReplyList(ctx, next) {
    const comment_id = ctx.query.comment_id;
    const replyList = await ReplyModel.find({ comment_id }).sort({ _id: -1 });
    ctx.status = 200;
    ctx.body = res.json(replyList);
  }
  static async getReplyDetailById(ctx, next) {
    const _id = ctx.params._id;
    const replyDetail = await ReplyModel.findById({ _id });
    if (!replyDetail) {
      throw new global.errs.NotFound("没有相关评论的回复详情信息");
    }
    ctx.body = res.json(replyDetail);
  }
  static async updateReplyById(ctx, next) {
    const _id = ctx.params._id;
    const reply = await ReplyModel.findByIdAndUpdate({ _id }, ctx.request.body);
    if (!reply) {
      throw new global.errs.NotFound("没有找到相关评论信息");
    }
    ctx.status = 200;
    ctx.body = res.success("更新评论成功");
  }
  static async deleteReplyById(ctx, next) {
    const _id = ctx.params._id;
    const reply = await ReplyModel.findByIdAndDelete({ _id });
    if (!reply) {
      throw new global.errs.NotFound("没有找到相关评论信息");
    }
    ctx.status = 200;
    ctx.body = res.success("删除评论成功");
  }
}
module.exports = ReplyController;
