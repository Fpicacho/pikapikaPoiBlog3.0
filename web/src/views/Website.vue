<template>
  <div id="box">
    <div id="webSite" style="padding: 40px;">
      <h1 style="color: #333">关于本站</h1>
      <p style="margin: 20px 0">
        <span style="font-weight: bold">关于本站:</span
        >F_picachoBlog是一个专注于前端技术分享，个人学习笔记，生活记录为主的个人博客，建立本博客旨在分享网络实用前端技巧，最新技术等等。。
      </p>
      <div style="margin: 20px 0">
        <p>
          <span style="font-weight: bold">关于pikaPikaPoiBlog</span>：<a
            href="#"
            >pikaPikaPoiBlog</a
          >由F_picacho开发，遵循<a href="#">GNU General Public Licence</a
          >开源协议即您可以:
        </p>
        <p>• 自由复制</p>
        <span
          >你可以将软件复制到你的电脑，你客户的电脑，或者任何地方。复制份数没有任何限制。</span
        >
        <p>• 自由分发</p>
        <span
          >在你的网站提供下载，拷贝到U盘送人，或者将源代码打印出来从窗户扔出去（环保起见，请别这样做）。</span
        >
        <p>• 可以用来盈利</p>
        <span
          >你可以在分发软件的时候收费，但你必须在收费前向你的客户提供该软件的
          GNU GPL
          许可协议，以便让他们知道，他们可以从别的渠道免费得到这份软件，以及你收费的理由。</span
        >
        <p>• 可自由修改</p>
        <span
          >如果你想添加或删除某个功能，没问题，如果你想在别的项目中使用部分代码，也没问题，唯一的要求是，使用了这段代码的项目也必须使用
          GPL 协议。</span
        >
        <p>
          需要注意的是，分发的时候，需要明确提供源代码和二进制文件，另外，用于某些程序的某些协议有一些问题和限制，你可以看一下
          @PierreJoye 写的
          <a
            href="http://www.softwarefreedom.org/resources/2008/compliance-guide.html"
            >Practical Guide to GPL Compliance</a
          >
          一文。使用 GPL 协议，你必须在源代码代码中包含相应信息，以及协议本身。
        </p>
      </div>
      <div style="margin: 20px 0">
        <p><span style="font-weight: bold">感谢:</span></p>
        <p>我的两位师傅：@刘建伟 @Mjj</p>
        <p>默默维护服务器正常运行的：@白菜</p>
        <p>
          开发以及学习过程中给予我帮助的伙伴：@BobH @蝶衣 @快辰 @节操 @恋雪 @y2nk4
          @ghost_chu @世界创造家 @初音未来是我的 @Kokic @风叶 @Hookan
          @丝滑拿铁 ...
        </p>
        <p>以及陪我度过无聊时光的:《精灵宝可梦》《某科学的超电磁炮》系列动画</p>
      </div>
      <div style="margin: 20px 0">
        <p><span style="font-weight: bold">注意:</span></p>
        <p>
          pikaPikaPoi默认前端演示借鉴了一些<a href="https://blog.y2nk4.com/"
            >y2nk4Blog</a
          >中的一些样式以及<a href="https://www.acfun.cn/">AcFun</a>部分配色
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "website"
};
</script>

<style lang="less" scoped>
#webSite {
  border-radius: 5px;
  background: #fff;
  p,
  span {
    font-size: 20px;
  }
}
#box {
  width: 55%;
  padding: 5px 0;
  margin: 50px auto;
  box-sizing: border-box;
  background: linear-gradient(
    45deg,
    #f25953 12.5%,
    #fbfaf5 12.5%,
    #fbfaf5 25%,
    #5590d6 25%,
    #5590d6 37.5%,
    #fbfaf5 37.5%,
    #fbfaf5 50%,
    #f25953 50%,
    #f25953 62.5%,
    #fbfaf5 62.5%,
    #fbfaf5 75%,
    #5590d6 75%,
    #5590d6 87.5%,
    #fbfaf5 87.5%,
    #fbfaf5 100%
  );
  background-size: 70px 70px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
a {
  text-decoration: none;
  color: #409EFF;
}
</style>
