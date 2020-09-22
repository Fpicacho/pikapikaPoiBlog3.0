<template>
  <div id="like">
    <p style="margin: 0 0 5px 0"><span>❤</span>&nbsp;{{like}}</p>
    <p>我觉得这个博主KO</p>
  </div>
</template>

<script>
export default {
  name: "main-like",
  data() {
    return {
      like: "连接至御坂网络中..."
    };
  },
  created() {
    this.axios.post("/like",).then(data=> (this.like = data.data.msg.like));
  },
  methods: {},
  computed: {}
};
</script>

<style lang="less" scoped>
#like {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  background: #ff9797;
  font-size: 25px;
  margin-bottom: 23.0402px;
  transition: background 0.3s;
  p {
    margin: 0;
    font-weight: bold;
  }
  &:hover {
    background: #ff6b6b;
    cursor: pointer;
  }
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}
</style>
