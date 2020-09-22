<template>
  <div class="login" id="login">
    <canvas id="canvas"></canvas>
    <div class="log-email" style="width: 30%">
      <h1>欢迎回来🎉</h1>
      <h2>登录pikaPikaPoilog系统</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="nickname" label-width="100px">
          <el-input
            type="text"
            v-model="ruleForm.nickname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="100px">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="width: 100%;margin-top: 15px"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
const SimplexNoise = require("simplex-noise");
const BG_COLOR = "#36393f";
const POINTS_AMOUNT = 1200;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const RADIUS = 730;
const image = new Image();
let canvas,
  ctx,
  simplex,
  points = [],
  dots = [],
  time = 0,
  dotsMoveCoef = 0;

window.onload = function init() {
  const BG_IMAGE_URL = "https://s1.ax1x.com/2020/09/22/wLmJ74.jpg";
  canvas = document.querySelector("#canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext("2d");
  ctx.shadowColor = "black";
  ctx.shadowBlur = 10;
  simplex = new SimplexNoise("noise1");

  image.src = BG_IMAGE_URL;

  document
    .querySelector("form")
    .addEventListener("submit", e => e.preventDefault());

  this.addEventListener("mousemove", e => {
    const halfX = window.innerWidth / 2;
    dotsMoveCoef = (e.clientX - halfX) / 100;
  });

  createPoints();
  createDots();
  animate();

  function createPoints() {
    for (let i = 0; i < POINTS_AMOUNT; i++) {
      const point = {
        x: +Math.cos((i / POINTS_AMOUNT) * Math.PI * 2),
        y: Math.sin((i / POINTS_AMOUNT) * Math.PI * 1.5)
      };
      point._x = point.x;
      point._y = point.y;

      points.push(point);
    }
  }

  function createDots() {
    for (let i = 0; i < 20; i++) {
      dots.push(new Dot());
    }
  }
};
function animate() {
  render();
  update();
  requestAnimationFrame(animate);

  function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = BG_COLOR;
    ctx.lineCap = "round";
    drawShape();
    drawDots();

    function drawShape() {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.fill();
    }

    function drawDots() {
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 2 * Math.PI, false);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });
    }
  }

  function update() {
    updatePoints();
    updateDots();

    function updatePoints() {
      const coef = 3.2;
      points.forEach(point => {
        let noise =
          simplex.noise2D(point._x * coef + time, point._y * coef + time) * 20;
        point.x = point._x * RADIUS + noise;
        point.y = point._y * RADIUS + noise;
      });
      time += 0.001;
    }

    function updateDots() {
      dots.forEach(dot => {
        dot.update();
      });
    }
  }
}

function Dot() {
  const x = Math.random() * RADIUS;

  return {
    radius: Math.round(Math.random() * 4),
    color: "#fff",
    x: x + dotsMoveCoef,
    _x: x,
    y: Math.random() * HEIGHT,
    speed: -Math.random() * 0.5,
    update: function() {
      this.y += this.speed;

      if (this.y + this.radius < 0) {
        this.y = HEIGHT + 50;
      }

      const delta = this.x - (this._x + dotsMoveCoef);
      if (Math.abs(delta) / 4 > 1) {
        this.x += delta > 0 ? 0.1 : -0.1;
      } else {
        this.x = this._x + dotsMoveCoef;
      }
    }
  };
}

export default {
  name: "Login",
  data() {
    const validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        nickname: "",
        password: ""
      },
      rules: {
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions({ adminLogin: "admin/adminLogin" }),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.adminLogin(this.ruleForm);
          localStorage.setItem("token", res.data.userInfo.token);
          this.$router.push("/home");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
};
</script>

<style scoped lang="less">
html,
body {
  width: 100%;
  height: 100%;
  #canvas {
    position: relative;
  }
  .log-email {
    position: absolute;
    text-align: center;
    top: 25%;
    left: 25%;
    padding: 40px;
    background: #36393f;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    h1 {
      margin: 30px 0;
      font-weight: 300;
      text-align: center;
      color: whitesmoke;
    }
    h2 {
      margin: 30px 0;
      color: #72767d;
    }
  }
}
</style>
