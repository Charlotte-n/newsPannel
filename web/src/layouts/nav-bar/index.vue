<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div class="nav_bar">
    <el-menu
      :default-active="route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/">首页 </el-menu-item>
      <el-menu-item index="/news">新闻中心 </el-menu-item>
      <el-menu-item index="/product">产品与服务</el-menu-item>
      <el-menu-item index="http://localhost:8080/login">登录</el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.nav_bar {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
