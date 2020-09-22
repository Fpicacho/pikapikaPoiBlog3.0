const ArticleModel = require("../models/ArticleModel");
const CommentModel = require("../models/CommentModel");
const ReplyModel = require("../models/ReplyModel");
const { articleValidator } = require("../validators/article");
const { Resolve } = require("../lib/helper");
const res = new Resolve();
class ArticleController {
  static async createArticle(ctx, next) {
    articleValidator(ctx);
    const { title } = ctx.request.body;
    const hasArticle = await ArticleModel.findOne({ title });
    if (hasArticle) {
      throw new global.errs.Existing("文章已存在");
    }
    await ArticleModel.create(ctx.request.body);
    ctx.body = res.success();
  }
  static async getArticleList(ctx, next) {
    // 获取分类id 当前分页的页数，每页显示的内容数 关键字
    let {
      category_id = null,
      pageIndex = 1,
      pageSize = 4,
      keyword,
    } = ctx.query;
    // 是否存在分类id
    let filter = {};
    if (category_id) {
      filter.category_id = category_id;
    }
    // 转整型
    pageIndex = parseInt(pageIndex);
    pageSize = parseInt(pageSize);
    // 文章
    // const reg = new RegExp(keyword, 'i');//不区分大小写
    // 获取文章总数量
    const total = await ArticleModel.find().count();
    // 获取分页之后的文章列表
    const articleList = await ArticleModel.find()
      .where(filter)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .or([
        // 模糊查询  query.or([{条件1},{条件2}])
        {
          keyword: {
            $regex: new RegExp(keyword, "i"),
          },
        },
      ])
      .sort({ _id: -1 }) //倒序
      .populate("category_id"); //连表查询
    const data = {
      articleList,
      currentPage: pageIndex,
      total,
      pageSize,
    };
    ctx.body = res.json(data);
  }
  static async updateArticle(ctx, next) {
    const _id = ctx.params._id;
    let article = await ArticleModel.findByIdAndUpdate(
      { _id },
      ctx.request.body
    );
    if (!article) {
      throw new global.errs.NotFound("没有找到相关文章");
    }
    ctx.status = 200;
    ctx.body = res.success("更新文章成功");
  }
  static async getArticleDetail(ctx, next) {
    const _id = ctx.params._id;
    // 获取文章详情表
    const articleDetail = await ArticleModel.findById({ _id }).populate(
      "category_id"
    );
    // 更新文章浏览数
    await ArticleModel.findByIdAndUpdate(
      { _id },
      { browse: ++articleDetail.browse }
    );
    if (!articleDetail) {
      throw new global.errs.NotFound("没有找到相关文章");
    }
    let commentList = await CommentModel.find({ target_id: articleDetail._id })
      .sort({ _id: -1 })
      .lean();
    let newCommentList = await Promise.all(
      commentList.map(async (comment) => {
        let replyList = await ReplyModel.find({
          comment_id: comment._id,
        });
        comment.replyList = replyList;
        return comment;
      })
    );
    const data = {
      articleDetail,
      commentList: newCommentList,
    };
    ctx.body = res.json(data);
  }
  static async deleteArticle(ctx, next) {
    const _id = ctx.params._id;
    let article = await ArticleModel.findByIdAndDelete({ _id });
    if (!article) {
      throw new global.errs.NotFound("没有找到相关文章");
    }
    ctx.status = 200;
    ctx.body = res.success("删除文章成功");
  }
  static async uploadCoverImg(ctx, next) {
    ctx.body = res.json(ctx.req.file.filename);
  }
}
module.exports = ArticleController;
