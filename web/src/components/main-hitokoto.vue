<template>
  <el-card>
    <div slot="header" style="margin-bottom: 10px" >
      <span style="color: #aaaaaa;font-size: 14px">Hitokoto - 一言</span>
    </div>
    <div class="text item" style="color: #777777;font-size: 14px">
      {{ hitokoto }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: "hitokoto",
  data() {
    return {
      hitokoto: "链接御坂网络中..."
    };
  },
  created() {
    this.axios
      .get("https://v1.hitokoto.cn/")
      .then(data => (this.hitokoto = data.data.hitokoto));
  }
};
</script>

<style scoped>
.hitokoto {
  width: auto;
  height: auto;
  background: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 30px;
  margin-bottom: 23.0402px;
}
</style>
