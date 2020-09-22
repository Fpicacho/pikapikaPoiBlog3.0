<template>
  <div class="class" style="height: 1007px">
    <div class="box">
      <div class="prospect">
        <img src="../assets/img/warning.png" alt="" width="60px">
        <p style="font-size: 30px;font-weight: 500;margin-top: 10px">Oh, damn it!</p>
        <p style="font-size: 15px;font-weight: 500;margin-top: 10px">您访问了一个错误的路由地址或者目标地址已经被管理员删除！</p>
        <p style="margin: 10px 0">
          You have visited a wrong routing address <br>
          or the destination address has been deleted by the administrator!
        </p>
        <a href="/" style="text-decoration: none;color: #fff">返回首页 <span style="font-size: 20px">→</span><br></a>
        <p style="margin-top: 530px;font-size: 14px">*By the way, do you know "Misaka Mikoto"? <br> No. 1 in the world, my wife.</p>
      </div>
      <img
        src="https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "404"
};
</script>

<style lang="less">
*{
  margin: 0;
  border: 0;
}
.prospect {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  padding: 150px 100px;
  color: #ffffff;
}
.box {
  position: relative;
}
</style>
