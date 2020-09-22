function categoryValidator(ctx) {
  ctx
    .validateBody("name")
    .required("分类关键字 name名字不能为空")
    .isString()
    .trim();
  ctx
    .validateBody("keyword")
    .required("分类关键字 keyword不能为空")
    .isString()
    .trim();
}
module.exports = {
  categoryValidator
};
