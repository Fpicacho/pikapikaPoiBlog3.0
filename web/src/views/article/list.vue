<!--文章列表-->
<template>
  <div id="box">
    <div id="banner">
      <VBanner></VBanner>
    </div>
    <section class="articles">
      <article class="article-list">
        <!-- 文章分类显示 -->
        <ul class="category" v-if="category && category.length > 0">
          <li
            class="category-item"
            :class="{ 'category-item-active': categoryIndex === i }"
            v-for="(item, i) in category"
            :key="item._id"
            @click="changeCategory(item._id, i)"
          >
            {{ item.name }}
          </li>
          <!-- <li class='category-item'>
            React
          </li>-->
        </ul>
        <!-- 文章组件-->
        <v-article-item :list="list" />

        <div class="page">
          <!-- 分页组件 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page.currentPage"
            :page-size="page.pageSize"
            layout="total, prev, pager, next"
            :total="page.total"
          ></el-pagination>
        </div>
      </article>
      <v-main-sidebar/>
    </section>
  </div>
</template>

<script>
import VArticleItem from "../../components/article-item";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    VArticleItem,
    VMainSidebar: () => import("../../components/main-sidebar"),
    VBanner: () => import("../../components/main-banner")
  },
  name: "list",
  data() {
    return {
      list: [],
      page: {},
      currentPage: 1,
      // categoryIndex: -1
    };
  },
  computed: {
    ...mapState({
      category: state => state.category.categoryList,
      categoryIndex:state => state.category.categoryIndex,
    })
  },
  async created() {
    await this.getCategoryList();
    this.getArticle();
  },
  watch:{
    $route(to,from){
      this.getArticle();
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //切换分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getArticle();
    },
    ...mapActions({
      getCategoryList: "category/list",
      getArticleList: "article/list"
    }),
    // 获取所有文章
    getAllArticle() {
      this.$router.push("/");
      this.getArticle();
      this.categoryIndex = -1;
    },
    //获取文章
    async getArticle() {
      const params = {
        pageIndex: this.currentPage,
        pageSize: 4,
        category_id: this.$route.query.category_id,
        keyword: this.$route.query.keyword
      };

      const r = await this.getArticleList(params);
      const { articleList, currentPage, total, pageSize } = r.data.data;
      this.list = articleList;
      this.page = { currentPage, total, pageSize };
    },
    // 切换分类
    changeCategory(id, i) {
      this.$store.commit('category/SET_CATEGROY_INDEX',i)
      localStorage.setItem('categoryIndex',i)
      this.$router.push({
        query: {
          category_id: id
        }
      });
      // this.getArticle();
    }
  }
};
</script>

<style scoped lang="less">
.category {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  height: 64px;
  line-height: 64px;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
}

.category-item {
  margin-left: 32px;
  cursor: pointer;
  color: #515a6e;
  font-size: 16px;
  font-weight: normal;

  &:hover {
    color: #fd4c5b;
  }
}

.category-item-active {
  color: #fd4c5b;
}

.articles {
  width: 55%;
  display: flex;
  min-height: 50vh;
  margin: 24px auto;
}

.article-list {
  flex: 1;
  margin-right: 32px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 2px 3px #f0f0f0;
  background: #fff;
}
.page{
  text-align: center;
}
@media screen and (min-width: 200px) and (max-width: 750px) {
  .articles {
    width: 100%;
  }

  .article-list {
    margin-right: 0;
  }
}
</style>
