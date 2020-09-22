<template>
  <section class="comment">
    <div class="comment-header">评论列表</div>
    <ul class="comment-box" v-if="comments && comments.length > 0">
      <li class="comment-item" v-for="item in comments" :key="item._id">
        <div class="comment-avatar">
          <el-avatar src="https://timgsa.baidu.com/timg?image"></el-avatar>
        </div>
        <div class="comment-info">
          <!-- 评论者姓名 -->
          <h1 class="comment-username">{{ item.nickname }}</h1>
          <p class="comment-content">{{ item.content }}</p>
          <!-- 回复列表 -->
          <div
            class="comment-reply"
            v-if="item.replyList && item.replyList.length > 0"
          >
            <ul class="comment-box">
              <li
                class="comment-item"
                v-for="reply in item.replyList"
                :key="reply._id"
              >
                <div class="comment-avatar">
                  <el-avatar
                    src="https://timgsa.baidu.com/timg?image"
                  ></el-avatar>
                </div>
                <div class="comment-info">
                  <h1 class="comment-username">
                    来自「{{ reply.nickname }}」的回复
                  </h1>
                  <p class="comment-content">{{ reply.content }}</p>
                </div>
              </li>
            </ul>
          </div>
          <p class="comment-reply-btn" @click="reply(item._id, item.nickname)">
            点击回复
          </p>
        </div>
      </li>
    </ul>
    <el-dialog :title="replyNickName" :visible.sync="show">
      <v-comment-create
        @updateReply="updateReply"
        :comment_type="commentType"
        :comment_id="comment_id"
      />
    </el-dialog>
  </section>
</template>
<script>
import VCommentCreate from "./comment-create";
import { mapState } from "vuex";
export default {
  props: {
    target_id: {
      type: String
    },
    target_type: {
      type: String,
      default() {
        return "article";
      }
    }
  },
  components: {
    VCommentCreate
  },
  data() {
    return {
      form: {
        name: "",
        region: ""
      },
      show: false,
      // 评论父级id
      comment_id: "",
      // 回复昵称
      replyNickName: "",
      replyArr: [],
      commentType: "reply",
      currentPage: 2
    };
  },
  methods: {
    // 回复评论
    reply(comment_id, nickname) {
      this.show = true;
      this.comment_id = comment_id;
      this.replyNickName = nickname;
    },
    updateReply(newReply, type) {
      // 更新评论
      this.show = !this.show;
      this.$emit("updateComment", newReply, type);
    }
  },
  computed: {
    ...mapState({
      comments: state => state.comment.commentList
    })
  }
};
</script>
<style scoped lang="less">
.comment-header {
  font-size: 28px;
  font-weight: 500;
  color: #2d8cf0;
  padding: 32px 0 16px;
}

.comment-item {
  margin: 16px 0;
  display: flex;
}

.comment-avatar {
  margin-right: 16px;
}

.comment-username {
  color: #17233d;
  font-size: 18px;
  font-weight: 500;
}

.comment-info {
  flex: 1;
}

.comment-content {
  color: #515a6e;
  line-height: 36px;
  font-size: 16px;
}

.comment-reply {
  padding: 12px 24px;
  margin: 24px 0;
  border-radius: 6px;
  background: #f8f8f8;
}

.comment-reply-btn {
  color: #2d8cf0;
  font-size: 16px;
  cursor: pointer;
}

.time {
  font-size: 14px;
  font-weight: bold;
}

.content {
  padding-left: 5px;
}

.load-more-comment {
  text-align: center;
  margin: 32px 0;
  font-size: 18px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
