<template>
  <section>
    <Button
      type="primary"
      @click="toPathLink('/article/create')"
      icon="md-add"
      style="margin-bottom: 16px;"
      >新增文章</Button
    >
    <section v-if="list.length > 0">
      <Table :loading="loading" border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="update(row._id)"
            >编辑</Button
          >
          <Button type="error" size="small" @click="destroy(row._id)"
            >删除</Button
          >
        </template>
      </Table>

      <section class="page">
        <Page
          :total="page.total"
          :page-size="page.pageSize"
          :current="page.currentPage"
          show-total
          @on-change="handlePage"
        ></Page>
      </section>
    </section>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "list",
  data() {
    return {
      loading: false,
      list: [],
      page: {
        total: 10,
        pageSize: 4,
        currentPage: 1,
      },
      currentPage: 1,
      pageSize: 4,
      columns: [
        {
          title: "文章封面",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.cover + "?imageView2/1/w/100/h/100",
              },
              style: {
                width: "80px",
                height: "80px",
                padding: "10px",
                "border-radius": "10px",
              },
            });
          },
        },
        {
          title: "文章分类",
          width: 100,
          align: "center",
          key: "category_id",
          render: (h, params) => {
            return h("div", [h("span", params.row.category_id.name)]);
          },
        },
        {
          title: "文章标题",
          key: "title",
        },
        {
          title: "浏览次数",
          width: 100,
          align: "center",
          key: "browse",
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center",
        },
      ],
    };
  },
  created() {
    this._getArticleList();
  },
  watch:{
    $route(){
      this._getArticleList();
    }
  },
  methods: {
    ...mapActions({
      getArticleList: "article/getArticleList",
      destroyArticle: "article/destroyArticle",
    }),
    async _getArticleList() {
      const r = await this.getArticleList({
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      });
      const { articleList, currentPage, total, pageSize } = r.data.data;
      this.list = articleList;
      this.page = { currentPage, total, pageSize };
    },
    // 切换分页
    handlePage(page) {
      this.currentPage = page;
      this._getArticleList();
    },
    // 更新
    update(id) {
      this.$router.push(`/article/update/${id}`);
    },
    // 路由跳转
    toPathLink(path) {
      this.$router.push(path);
    },
    // 删除文章
    destroy(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除此文章吗？</p>",
        loading: true,
        onOk: async () => {
          try {
            await this.destroyArticle({ id });
            this.$Message.success("删除成功");
            this._getArticleList();
          } catch (e) {
            console.log(e);
            this.$Message.error(e);
          } finally {
            this.$Modal.remove();
          }
        },
        onCancel: () => {
          this.$Message.warning("取消！");
        },
      });
    },
  },
};
</script>

<style scoped>
.page {
  padding: 32px 0;
  text-align: center;
}
</style>
