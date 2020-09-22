const { commentValidator } = require("../validators/comment");
const CommentModel = require("../models/CommentModel");
const ReplyModle = require("../models/ReplyModel");
const { Resolve } = require("../lib/helper");
const res = new Resolve();
class CommentController {
  static async createComment(ctx, next) {
    commentValidator(ctx);
    let newComment = await CommentModel.create(ctx.request.body);
    ctx.body = res.json(newComment);
  }
  static async getCommentList(ctx, next) {
    const { pageIndex = 1, pageSize = 4 } = ctx.query;
    // 获取总数
    const total = await CommentModel.find().count();
    const commentList = await CommentModel.find()
      .skip(parseInt(pageIndex - 1) * pageSize)
      .sort({ _id: -1 })
      .limit(parseInt(pageSize))
      .lean();
    ctx.status = 200;
    const data = {
      commentList,
      currentPage: parseInt(pageIndex),
      total,
      pageSize: parseInt(pageSize)
    };
    ctx.body = res.json(data);
  }
  static async getCommentDetailById(ctx, next) {
    const _id = ctx.params._id;
    const commentDetail = await CommentModel.findById({ _id });
    if (!commentDetail) {
      throw new global.errs.NotFound("没有找到相关评论信息");
    }
    const replyList = await ReplyModle.find({
      comment_id: commentDetail._id
    }).lean();
    ctx.status = 200;
    ctx.body = res.json(replyList, commentDetail);
  }
  static async updateCommentDetailById(ctx, next) {
    const _id = ctx.params._id;
    const comment = await CommentModel.findByIdAndUpdate(
      { _id },
      ctx.request.body
    );
    if (!comment) {
      throw new global.errs.NotFound("没有找到相关评论");
    }
    ctx.status = 200;
    ctx.body = res.success("更新评论成功");
  }
  static async deleteCommentById(ctx, next) {
    const _id = ctx.params._id;
    const comment = await CommentModel.findOneAndDelete({ _id });
    if (!comment) {
      throw new global.errs.NotFound("没有找到相关评论");
    }
    ctx.body = res.success("删除评论成功");
  }
}

module.exports = CommentController;
