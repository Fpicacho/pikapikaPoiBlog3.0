<template>
  <div>
    <blogAbout/>
    <v-header></v-header>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from "@/components/main-header";
import VFooter from "@/components/main-footer";
import blogAbout from "@/components/blogAbout";
export default {
  name: "Index",
  components: {
    VHeader,
    VFooter,
    blogAbout,
  }
}
</script>

<style lang="less" scoped>

</style>