<!--文章详情-->
<template>
  <section class="article-detail" v-if="articleDetail">
    <div class="article-container">
      <h1 class="article-title">{{ articleDetail.title }}</h1>
      <ul class="article-intro">
        <li
          class="articles-item-category"
          v-if="articleDetail.category_id.name"
        >
          {{ articleDetail.category_id.name }}
        </li>
        <li>
          <!-- 文章作者 -->
          <i class="el-icon-user"></i>
          {{ articleDetail.author }}
        </li>
        <li>
          <!-- 文章浏览数 -->
          <i class="el-icon-view"></i>
          {{ articleDetail.browse }}
        </li>
        <li>
          <!-- 评论数 -->
          <i class="el-icon-chat-round"></i>
          {{ commentList.length }}
        </li>
      </ul>
      <div class="article-content">
        <!-- 内容显示组件 -->
        <mavon-editor
          style="height: 100%"
          :ishljs="true"
          v-model="articleDetail.content"
          :defaultOpen="'preview'"
          :editable="false"
          :subfield="false"
          :toolbarsFlag="false"
        />
      </div>

      <!-- 新建评论-->
      <div class="comment-header">
        <i class="el-icon-edit-outline"></i>
        欢迎评论
      </div>
      <v-comment-create
        :target_id="articleDetail._id"
        @updateComment="updateComment"
      />
      <div>
        <v-comment-list :target_id="id" @updateComment="updateComment" />
      </div>
    </div>

    <!-- 侧边栏 -->
    <v-main-sidebar />
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    VMainSidebar: () => import("../../components/main-sidebar"),
    VCommentCreate: () => import("../../components/comment-create"),
    VCommentList: () => import("../../components/comment-list")
  },
  name: "detail",
  data() {
    return {
      articleDetail: {},
      id: this.$route.query.id,
      targetType: "article",
      commentList: []
    };
  },
  methods: {
    ...mapActions({
      getArticleDetail: "article/detail"
    }),
    async _getArticleDetail() {
      let res = await this.getArticleDetail({ id: this.id });
      const { articleDetail, commentList } = res.data.data;
      this.articleDetail = articleDetail;
      this.commentList = commentList;

      this.$store.commit("comment/SET_COMMENT_LIST", commentList);
    },
    updateComment(newComment, type) {
      if (type === "comment") {
        this.commentList.unshift(newComment);
      } else if (type === "reply") {
        this._getArticleDetail();
      }
    }
  },
  created() {
    this._getArticleDetail();
  }
};
</script>

<style scoped lang="less">
.article-detail {
  width: 55%;
  margin: 24px auto;
  min-height: 80vh;
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
}

.article-container {
  box-sizing: border-box;
  flex: 1;
  padding: 32px;
  margin-right: 32px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 2px 3px #f0f0f0;
  background: #fff;
}

.article-title {
  color: #17233d;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
}

.article-intro {
  color: #515a6e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
}

.article-intro li {
  display: flex;
  align-items: center;
  margin-right: 24px;
  font-size: 16px;
  color: #9ea7b4;
  white-space: nowrap;
}

li.articles-item-category {
  height: 28px;
  line-height: 28px;
  padding: 0 24px;
  font-size: 16px;
  color: #fd4c5b;
  border-radius: 64px;
  background: rgba(253, 76, 91, 0.1);
}

.comment-header {
  font-size: 28px;
  font-weight: 500;
  color: #fd4c5b;
  padding: 32px 0 16px;
  display: flex;
  align-items: center;
}

@media screen and (min-width: 200px) and (max-width: 750px) {
  .article-detail {
    width: 100%;
  }

  .article-container {
    margin-right: 0;
  }
}
</style>
