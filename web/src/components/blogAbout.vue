<template>
  <el-drawer :visible.sync="drawer" :with-header="false">
    <div
      class="header"
      style="margin-left: 210px;margin-top: 60px;
user-select:none;"
    >
      <img
        style="width: 160px;border-radius: 50%;"
        src="../assets/me.png"
        alt=""
      />
    </div>
    <div class="name" style="margin-top: 10px">
      <p
        style="font-size: 25px;font-weight: bold;text-align: center;color: #333333"
      >
        揣方超
      </p>
      <p
        style="text-align: center;font-size: 20px;margin-top: 5px;color:#323437"
      >
        F_picacho
      </p>
    </div>
    <div class="brief" style="width: 550px;margin: 0 auto;">
      <div style="width: 480px;margin: 0 auto;font-size: 14px">
        <p style="margin-top: 20px">
          大概是2015年1月30日，F_picacho这个奇怪的拼写组合被赋予了含义，此后这个ID陪着他写了无数行破代码和画了无数张废画。
        </p>
        <p style="margin-top: 8px">
          ——童年总是不会缺少满满的中二，每天和朋友上课画画，也因此让无数个只用了数页的本子和教材含冤而逝。直到初二的时我遇到了改变了F_picacho一
          生的人，从此之后每天写写画画涂涂改改打打闹闹的朦胧而又五彩缤纷的日常带着些许稚气拉开序幕。现在回想起来当时的他是个十足的矛盾体，只学习感兴趣的好玩的,纪律上几乎是无恶不做。
        </p>
        <p style="margin-top: 8px">
          那个时候课余时间基本都是在网吧里度过，说真的我很感谢带我去网吧的朋友。我的朋友们喜欢研究游戏操作，磨练技巧，大杀四方
          。而我当时的性格就想着如何短时间的的提升自己，慢慢的我找到了这条路，学习编程，开发外挂。
        </p>
        <p style="margin-top: 8px">
          从简单的线上Flash游戏到当年火爆的英雄联盟，F_picacho开发了无数款外挂，这些成为了他日后编程的基础。而F_picacho的学习态度也决定
          了他的中考成绩。虽然不高但是也算幸运他选择了自己喜欢的美术专业。
        </p>
        <p style="margin-top: 8px">
          那个时候的他是真的狂，慢慢的被打击无论是编程方面还是绘画方面都渐渐的见证自己的堕落。真的是应了那句话，天才皆毁于傲。高二那年对于
          F_picacho来说是最黑暗的一年因为一些事情他又回到了那个无所事事的每一天，几乎是浪费了度过了两年。
        </p>
        <p style="margin-top: 8px">
          直到大学我又很幸运的虽然分数不高但是专业是我擅长的领域，又遇到了教我很多技能的师傅，那个时候我决定了从头开始，沉下心来。
        </p>
        <p style="margin-top: 8px">
          虽说本来只是想给自己写篇简单的自我介绍，结果似乎还是没有避免成为一篇自说自话的中二文的命运，因为排版限制没有很详细的写一些经历。时
          针仍然在随着石英的震荡缓缓向前，未来还不可预见而需要用双手去缔造。就算抛开其他的不谈，至少为了让自己以后不会为了此刻的举动后悔，那
          么就尽最大努力去前进吧。
        </p>
        <el-button
          type="danger"
          round
          style="margin:10px 0 0 390px"
          @click="innerDrawer = true"
          >专业栈</el-button
        >
      </div>
    </div>
    <el-drawer
      :with-header="false"
      :append-to-body="true"
      :visible.sync="innerDrawer"
      size="350px"
    >
      <div style="width: 300px;margin: 0 auto;font-size: 14px">
        <div style="margin-top: 50px">
          <p style="margin-bottom: 5px">HTML/CSS3静态页面</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="90"
            status="success"
          ></el-progress>
        </div>
        <div style="margin-top: 15px">
          <p style="margin-bottom: 5px">JavaScript</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="65"
            status="warning"
          ></el-progress>
        </div>
        <div style="margin-top: 15px">
          <p style="margin-bottom: 5px">Vue</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="75"
            status="success"
          ></el-progress>
        </div>
        <div style="margin-top: 15px">
          <p style="margin-bottom: 5px">PHP/Mysql</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="60"
            status="exception"
          ></el-progress>
        </div>
        <div style="margin-top: 15px">
          <p style="margin-bottom: 5px">Python</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="65"
            status="success"
          ></el-progress>
        </div>
        <div style="margin-top: 15px">
          <p style="margin-bottom: 5px">NodeJS/MongoDB</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="75"
            status="exception"
          ></el-progress>
        </div>
        <div style="margin-top: 15px">
          <p style="margin-bottom: 5px">PS/AI/PR/AE/C4D</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="70"
          ></el-progress>
        </div>
        <div style="margin-top: 15px">
          <p style="margin-bottom: 5px">Linux</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="30"
            status="exception"
          ></el-progress>
        </div>
        <div style="margin-top: 15px">
          <p style="margin-bottom: 5px">绘画</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="50"
            status="exception"
          ></el-progress>
        </div>
      </div>
    </el-drawer>
  </el-drawer>
</template>

<script>
export default {
  name: "blogAbout",
  data() {
    return {
      direction: "rtl",
      innerDrawer: false
    };
  },
  computed: {
    // 双向绑定的计算属性
    // drawer(){
    //   return this.$store.state.isAbout
    // }
    drawer: {
      get: function() {
        return this.$store.state.isAbout;
      },
      set(value) {
        this.$store.commit("aboutIs", value);
      }
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #323437;
  display: block;
  margin-top: 15px;
}
</style>
