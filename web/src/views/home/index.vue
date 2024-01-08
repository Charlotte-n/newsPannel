<script></script>
<template>
  <div class="home">
    <div class="container text-center">
      <el-carousel height="calc(100vh - 59px)">
        <el-carousel-item key="1">
          <div
            class="img"
            :style="{
              backgroundImage: `url(${require('@/assets/img/home1.jpg')})`,
            }"
            key="1"
          ></div>
        </el-carousel-item>
        <el-carousel-item key="2">
          <div
            class="img"
            :style="{
              backgroundImage: `url(${require('@/assets/img/home2.jpg')})`,
            }"
          ></div>
        </el-carousel-item>
        <el-carousel-item key="3">
          <div
            class="img"
            :style="{
              backgroundImage: `url(${require('@/assets/img/home3.jpg')})`,
            }"
          ></div>
        </el-carousel-item>
      </el-carousel>
      <div class="title">互联网+时代</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
}
.el-carousel .img {
  height: 100%;
  width: 100%;
  background-size: cover;
}
.title {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: white;
}
</style>
