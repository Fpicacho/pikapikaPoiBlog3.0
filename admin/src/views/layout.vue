<template>
  <div class="layout">
    <Layout>
      <Sider
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="80"
          v-model="isCollapsed"
          style="overflow-y: auto"
      >
        <div class="layout-logo-left" :style="isCollapsed ? 'font-size:12px': ''">pikaPikaPoi控制台</div>
        <Menu
            :accordion="true"
            width="auto"
            :class="menuitemClasses"
            @on-select="goLink"
            theme="dark"
            v-if="menus"
        >
          <div class v-for="(item, index) in menus" :key="index">
            <Submenu :name="item.path" v-if="item.children && item.children.length > 0">
              <template slot="title">
                <Icon class="layout-icon" :type="item.icon"></Icon>
                <span class="layout-text">{{ item.name }}</span>
              </template>
              <MenuItem
                  :name="child.path"
                  style="padding-left: 20px;"
                  v-for="(child, ind) in item.children"
                  :key="ind"
              >
                <Icon :type="child.icon" class="layout-icon"></Icon>
                <span class="layout-text">{{ child.name }}</span>
              </MenuItem>
            </Submenu>

            <MenuItem :name="item.path" v-else style="padding: 14px 14px;">
              <Icon class="layout-icon" :type="item.icon"></Icon>
              <span class="layout-text">{{ item.name }}</span>
            </MenuItem>
          </div>
        </Menu>
      </Sider>
      <Layout>
        <div class="fixed-box">
          <Header :style="{padding: 0}" class="layout-header-bar">
            <Icon
                @click.native="collapsedSider"
                :class="rotateIcon"
                :style="{margin: '0 20px'}"
                type="md-menu"
                size="24"
            ></Icon>
            <div style="float: right;margin-right: 20px" v-if="userInfo">
              <Dropdown transfer trigger="hover" @on-click="exitAccount">
                <a href="javascript:void(0)">
                  <Avatar size="small" style="background-color: #2d8cf0" icon="ios-person"/>
                  <span class="main-user-name">{{userInfo.nickname}}</span>
                  <Icon type="ios-arrow-down"/>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Header>
        </div>

        <Content class="content-wrapper">
          <div class="layout-content">
            <div class="layout-content-main">
              <br>
              <!-- loading显示 -->
              <Spin class="layout-loading" size="large" fix v-if="1===2"></Spin>
              <keep-alive>
                <router-view
                />
              </keep-alive>
            </div>
          </div>
          <div class="layout-copy">2020 &copy; <a href="https://space.bilibili.com/405541217">pikaPikaPoiBlog</a></div>
        </Content>
      </Layout>
    </Layout>

  </div>
</template>
<script>
import { menus } from "./menus";
import {mapState} from 'vuex'
export default {
  components: {},
  data() {
    return {
      isCollapsed: false,
      menus: menus
    };
  },
  methods: {
    goLink(name) {
      this.$router.push({
        path: name
      });
    },
    // 退出登陆
    exitAccount() {
      console.log('退出登录')
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  },
  mounted() {
  },
  computed: {
    ... mapState({
      userInfo: state =>state.admin.userInfo
    }),
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  }

};
</script>
<style>
.ivu-menu-submenu-title {
  padding: 14px 14px !important;
}
</style>
<style scoped>
.layout {
  height: 100%;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.ivu-layout-header {
  height: 48px;
  line-height: 48px;
}

.layout-logo-left {
  width: 90%;
  height: 44px;
  margin: 10px auto;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  font-weight: bold;
}

.layout-icon {
  font-size: 14px;
  width: 18px;
  text-align: center;
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 100px;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  position: relative;
  padding: 0px 10px;
  min-height: 400px;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-text {
  width: 100px;
  text-overflow: clip !important;
}

.ivu-layout.ivu-layout-has-sider {
  height: 100% !important;
}

.fixed-box {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
}
</style>