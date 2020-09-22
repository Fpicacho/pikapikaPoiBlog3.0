<template>
  <div id="search" style="background: #fff ;margin-bottom: 10px">
    <div class="sidebar-header" style="margin-top: 10px">
      <div class="sidebar-header-title">
        <i class="el-icon-search" style="color: #fd4c5d;"></i>
        搜索文章
      </div>
    </div>
    <div class="sidebar-box-content" style="padding: 20px 20px">
      <el-input
        size="default"
        @keyup.enter.native="search"
        suffix="ios-search"
        v-model="keyword"
        placeholder="搜索文章.."
        style="width: auto"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-search",
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    search() {
      this.$router.push({
        path:`/home/?keyword=${this.keyword}`
      })
      this.keyword = '';
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar-box {
  margin-bottom: 32px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 1px 2px 3px #f0f0f0;
  background: #fff;
}
.sidebar-box-content {
  padding: 0 32px;
}
</style>
