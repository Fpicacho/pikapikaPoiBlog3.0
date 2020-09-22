<template>
  <div class="banner">
    <el-carousel height="920px" direction="vertical" :autoplay="false">
      <el-carousel-item>
        <img src="../assets/img/blogBgc3.png" alt="" style="width: 100%;height: 100%;background: #333" id="bannerImg">
      </el-carousel-item>
      <el-carousel-item>
        <video src="../assets/blogBgc2.mp4" controls="controls" style="width: 100%;height: 100%;background: #333">
          请更换IE10+或主流内核(Chrome Mozilla)浏览器进行观看!
        </video>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "banner",
}
</script>

<style scoped>
#bannerImg{
  object-fit: cover;
}
</style>
