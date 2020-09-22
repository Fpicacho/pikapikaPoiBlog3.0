<template>
  <section>
    <Button
      type="primary"
      @click="toPathLink('/category/create')"
      icon="md-add"
      style="margin-bottom: 16px;"
      >新增分类</Button
    >

    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
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
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "list",
  data() {
    return {
      list: [
        {
          _id: 1,
          name: "Vue",
          keyword: "vue,vuex",
          article_nums: 10,
        },
        {
          _id: 2,
          name: "React",
          keyword: "react,redux",
          article_nums: 20,
        },
      ],
      page: null,
      columns: [
        {
          title: "分类名称",
          key: "name",
        },
        {
          title: "分类关键字",
          key: "keyword",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
    };
  },
  async created() {
    this._getCategoryList();
  },
  watch: {
    $route(to, from) {
      this._getCategoryList();
    },
  },
  methods: {
    ...mapActions({
      getCategoryList: "category/getCategoryList",
      destroyCategory: "category/destroyCategory",
    }),
    async _getCategoryList() {
      const res = await this.getCategoryList();
      this.list = res.data.data;
    },
    // 更新
    update(id) {
      this.$router.push(`/category/update/${id}`);
    },
    async destroy(id) {
      await this.destroyCategory({ id });
      this.$Message.success('删除分类成功');
      this._getCategoryList();
    },
    // 路由跳转
    toPathLink(path) {
      this.$router.push(path);
    },
  },
  // destroy(id) {
  //   this.$Modal.confirm({
  //     title: "提示",
  //     content: `<p>确定删除此分类吗？</p>`,
  //     loading: true,
  //     onOk: async () => {
  //       try {
  //         await this.destroyCategory({ id });
  //         this.$Message.success("删除成功");
  //         this._getCategoryList();
  //       } catch (error) {
  //         this.$Message.error("删除失败");
  //       } finally {
  //         this.$Modal.remove();
  //       }
  //     },
  //     onCancel: () => {
  //       this.$Message.warning("取消!");
  //     },
  //   });
  // },
};
</script>

<style scoped></style>
