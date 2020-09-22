<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="nickname">
              <i-input v-model="form.nickname" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              >
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem>
              <Button
                :loading="buttonLoading"
                @click="handleSubmit"
                type="primary"
                long
                >登录</Button
              >
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      buttonLoading: false,
      // 表单内容，username && 密码
      form: {
        nickname: "",
        password: "",
      },

      // 表单验证，username && 密码
      rules: {
        nickname: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.$Loading.finish();
  },
  methods: {
    ...mapActions({
      adminLogin: "admin/adminLogin",
    }),

    // 提交登录
    handleSubmit() {
      this.buttonLoading = true;
      // 表单验证
      let formLabel = this.$refs.loginForm;
      formLabel.validate(async (valid) => {
        if (!valid) {
          this.$Message.error("表单验证失败!");
          this.buttonLoading = false;
          return false;
        }
        console.log("表单验证成功");
        const res = await this.adminLogin(this.form);
        localStorage.setItem("admin_token", res.data.userInfo.token);
        this.$router.replace("/");
      });
    },
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}

.login {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.login-con {
  position: absolute;
  right: 160px;
  top: 50%;
  transform: translateY(-60%);
  width: 300px;
}

.login-header {
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  padding: 30px 0;
}

.form-con {
  padding: 10px 0 0;
}

.login-tip {
  font-size: 10px;
  text-align: center;
  color: #c3c3c3;
}
</style>
