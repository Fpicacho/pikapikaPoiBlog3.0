<template>
  <section class="comment-create">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      label-position="left"
      class="demo-ruleForm"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="ruleForm.nickname"
          placeholder="请输入您的昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="评论" prop="content">
        <el-input
          type="textarea"
          v-model="ruleForm.content"
          placeholder="请输入评论内容"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">清空</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          comment_type === "comment" ? "评论" : "回复"
        }}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  props: {
    target_id: {
      type: String
    },
    comment_type: {
      type: String,
      default() {
        return "comment";
      }
    },
    comment_id: {
      type: String
    }
  },
  data() {
    return {
      ruleForm: {
        nickname: "",
        content: ""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入您的昵称", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入评论", trigger: "blur" },
          {
            type: "string",
            min: 2,
            message: "评论不能少于2个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions({
      createComment:'comment/createComment',
      createReply:'reply/createReply'
    }),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            if (this.comment_type === 'comment'){
              this.ruleForm.target_id = this.target_id
              let res = await this.createComment(this.ruleForm)
              this.$emit('updateComment',res.data.data,'comment')
              this.$message({
                message: "评论成功",
                type: "success"
              });
            }else if(this.comment_type=='reply'){
              this.ruleForm.comment_id = this.comment_id;
              let res = await this.createReply(this.ruleForm);
              this.$emit('updateReply',res.data.data,'reply');
            }
            // 重置表单
            this.resetForm("ruleForm");
          } catch (e) {
            console.log(e);
          }
        } else {
          this.$message({
            message: "表单验证失败!",
            type: "error"
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.comment-header {
  font-size: 28px;
  font-weight: 500;
  color: #2d8cf0;
  padding: 32px 0;
}
</style>
