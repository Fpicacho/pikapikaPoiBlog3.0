<template>
  <article class="sidebar">
    <Vlike />
    <Vhitokoto />
    <Vsearch />
    <div class="sidebar-box">
      <div class="sidebar-header">
        <div class="sidebar-header-title">
          <i class="el-icon-paperclip" style="color: #fd4c5d;"></i>
          友情链接
        </div>
      </div>
      <div class="sidebar-box-content">
        <ul>
          <li
            class="sidebar-box-content-item"
            v-for="item in advertiseList"
            :key="item._id"
          >
            <a :href=item.link target="_blank">
              <div>
                {{ item.title }}
              </div>
            </a>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "main-sidebar",
  components: {
    Vlike: () => import("@/components/main-like"),
    Vhitokoto: () => import("@/components/main-hitokoto"),
    Vsearch: () => import("@/components/main-search")
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      advertiseList: state => state.advertise.advertiseList
    })
  },
  methods: {
    ...mapActions({
      getArticleList: "advertise/list"
    })
  },

  async created() {
    await this.getArticleList();
  }
};
</script>

<style scoped lang="less">
.sidebar {
  width: 350px;
}

@media screen and (min-width: 200px) and (max-width: 750px) {
  .sidebar {
    display: none;
  }
}

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

.sidebar-box-content-item {
  cursor: pointer;
  display: flex;
  margin: 24px 0;
  align-items: center;
  justify-content: space-between;
  color: #657180;

  &:hover {
    color: #2d8cf0;
  }
}

.sidebar-box-content-item h1 {
  font-size: 16px;
  font-weight: 400;
}

.sidebar-box-content-item a {
  flex: 1;
  color: #657180;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: #2d8cf0;
  }
}

.sidebar-box-content-item span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.icon {
  margin-right: 10px;
}
</style>
