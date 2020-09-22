<template>
  <section>
    <div class="empty" v-if="list.length === 0">
      暂无回复
    </div>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="error" size="small" @click="destroy(row._id)"
            >删除</Button
          >
        </template>
      </Table>
    </section>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "list",
  data() {
    return {
      comment_id: this.$route.params.comment_id,
      list: [],
      columns: [
        {
          title: "回复人昵称",
          key: "nickname",
        },
        {
          title: "回复内容",
          key: "content",
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
    this._getReplyList(this.comment_id);
  },
  watch: {
    $route(to, from) {
      if (to.params.comment_id) {
        this._getReplyList(to.params.comment_id);
      }
    },
  },
  methods: {
    ...mapActions({
      getReplyListByCommentId: "reply/getReplyListByCommentId",
      destroyReply: "reply/destroyReply",
    }),
    async _getReplyList(comment_id) {
      let res = await this.getReplyListByCommentId({ comment_id });
      this.list = res.data.data;
    },
    reply() {},
    // 删除分类
    destroy(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除此回复评论吗？</p>",
        loading: true,
        onOk: async () => {
          try {
            await this.destroyReply({ id });
            this.$Message.success("删除成功");
            this._getReplyList(this.$route.params.comment_id);
          } catch (e) {
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
.empty {
  padding: 32px 0;
  text-align: center;
}
</style>
