<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {

};
</script>
<style lang="less">
/*使用公共的css代码块*/
@import "./assets/css/common.less";
html,
body {
  margin: 0;
  padding: 0;
  background: url(./assets/img/background.png) no-repeat;
  background-size: 90%;
  background-position: bottom left;
  background-attachment: fixed;
  background-color: #efefef;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

ul,
li,
h1,
div,
dl,
dt,
dd {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
