<template>
  <div id="main-header">
    <div id="header-logo">
      <img src="../assets/img/logo.png" alt="logo丢失请联系管理员修复" />
    </div>
    <div id="header-menu">
      <ul class="nav-box">
        <li v-for="item in nav" :key="item.id">
          <router-link exact :to="item.router">{{ item.name }}</router-link>
        </li>
        <li @click="$store.commit('aboutIs')">
          <a href="javascript:void(0);">关于我</a>
        </li>
        <li v-if="userInfo">
          <div class="userInfo">
            <el-dropdown>
              <a href="javascript:;">{{ userInfo }}</a>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-user">
                  我的主页
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit">
                  写文章
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">
                  设置
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-warning">
                  关于
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-d-arrow-right" @click.native="logout">
                  退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "main-header",
  computed: {
    ...mapState({
      userInfo: state => state.admin.userInfo
    }),
  },
  data() {
    return {
      keyword: "",
      currentIndex: 0,
      nav: [
        {
          name: "首页",
          router: "/home"
        },
        {
          name: "绘画",
          router: "/painting"
        },
        {
          name: "关于站点",
          router: "/website"
        },
        {
          name: "登录",
          router: "/login"
        }
      ]
    };
  },
  methods:{
    logout(){
      localStorage.removeItem('token');
      this.$router.go(0)
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/common.less";
#main-header {
  display: flex;
  width: 100%;
  height: 120px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  background: #fff;
  #header-logo {
    margin-left: 40px;
    img {
      height: 100px;
    }
  }
  #header-menu {
    margin-right: 40px;
    ul {
      li {
        display: inline-block;
        margin-left: 30px;
        a {
          text-decoration: none;
          color: rgba(214, 86, 6, 0.64);
          font-size: 20px;
          font-weight: bold;
          transition: all 0.3s;
          &:hover {
            color: #fd4c5d;
            transition: all 0.3s;
          }
        }
      }
    }
  }
}
.user {
  color: rgba(214, 86, 6, 0.64);
  font-size: 20px;
  font-weight: bold;
  transition: all 0.3s;
}
@media screen and (max-width: 500px) {
  #main-header {
    justify-content: space-evenly;
  }
  #header-logo {
    display: none;
  }
}
</style>
