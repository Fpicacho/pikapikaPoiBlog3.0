<template>
  <section>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
    >
      <FormItem label="文章标题" prop="title">
        <Input v-model="formValidate.title" placeholder="文章标题" />
      </FormItem>
      <FormItem label="文章作者" prop="author">
        <Input v-model="formValidate.author" placeholder="文章作者" />
      </FormItem>
      <FormItem label="文章简介" prop="description">
        <Input v-model="formValidate.description" placeholder="文章简介" />
      </FormItem>
      <FormItem label="文章关键字" prop="keyword">
        <Input v-model="formValidate.keyword" placeholder="文章简介" />
      </FormItem>
      <FormItem
        label="文章分类"
        v-if="categoryList && categoryList.length > 0"
        prop="category_id"
      >
        <Select v-model="formValidate.category_id">
          <Option
            v-for="(item, index) in categoryList"
            :value="item._id"
            :key="index"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="文章封面" prop="cover">
        <div class="cover">
          <div class="upload">
            <Upload
              multiple
              type="drag"
              action="http://localhost:5000/api/v1/upload"
              :show-upload-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              name="avatar"
            >
              <div style="padding: 20px 0">
                <Icon
                  type="ios-cloud-upload"
                  size="52"
                  style="color: #3399ff"
                ></Icon>
                <p>点击或者拖拽上传</p>
              </div>
            </Upload>
          </div>
          <div class="article-cover" v-if="formValidate.cover">
            <img :src="formValidate.cover" alt="cover" />
          </div>
        </div>
      </FormItem>
      <FormItem label="文章内容" prop="content">
        <mavon-editor v-model="formValidate.content" :ishljs="true" ref="md">
        </mavon-editor>
      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button
          type="primary"
          @click="handleSubmit('formValidate')"
          style="margin-left: 8px"
          >提交</Button
        >
      </FormItem>
    </Form>
  </section>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      token: "",
      id: this.$route.params.id,
      detail: null,
      categoryList: [],
      formValidate: {
        title: "",
        author: "",
        category_id: "",
        cover: "",
        description: "",
        keyword: "",
        content: "",
      },
      ruleValidate: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" },
        ],
        author: [
          { required: true, message: "文章作者不能为空", trigger: "blur" },
        ],
        cover: [
          { required: true, message: "文章封面不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "文章简介不能为空", trigger: "blur" },
        ],
        keyword: [
          { required: true, message: "文章关键字不能为空", trigger: "blur" },
        ],
        content: [
          { required: true, message: "文章内容不能为空", trigger: "blur" },
        ],
        category_id: [
          { required: true, message: "分类不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this._getCategoryList();
  },
  methods: {
    ...mapActions({
      getCategoryList: "category/getCategoryList",
      createArticle: "article/createArticle",
    }),
    uploadSuccess(response, file, fileList) {
      const coverUrl = `http://localhost:5000/images/${response.data}`; 
      this.formValidate.cover = coverUrl;
      this.$Message.success('文件上传成功')
    },
    // 上传图片失败
    uploadError(response) {
      this.$Message.error("上传失败!");
      console.log(response);
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 创建文章
          this._createArticle();
        } else {
          this.$Message.error("请完成表单!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    async _getCategoryList() {
      const res = await this.getCategoryList();
      console.log(res);
      this.categoryList = res.data.data;
    },
    async _createArticle() {
      await this.createArticle(this.formValidate);
      this.$Message.success("文章创建成功");
      this.$router.push("/acticle");
    },
  },
};
</script>
<style scoped>
.article-cover {
  width: 120px;
}

.article-cover img {
  width: 100%;
}

.cover {
  display: flex;
}

.cover .upload {
  width: 280px;
  margin-right: 32px;
}
</style>
