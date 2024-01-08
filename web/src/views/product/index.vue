<script setup>
import { ref, onMounted } from "vue";
//获取产品的数据
import { getProdcutListApi } from "@/apis/product";

const ProductList = ref();
const getProductList = async () => {
  const res = await getProdcutListApi();
  ProductList.value = res.data;
};
onMounted(() => {
  getProductList();
});
</script>

<template>
  <div class="banner">
    <!--    走马灯-->
    <el-carousel
      height="calc(100vh - 60px)"
      direction="vertical"
      :autoplay="false"
      style="width: 100vw"
    >
      <el-carousel-item v-for="item in ProductList" :key="item">
        <img
          :src="`http://localhost:3000/${item.cover}`"
          alt=""
          class="image"
        />
        <div class="card">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>Card name</span>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "List item " + o }}
            </div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.image {
  height: 100%;
  width: 100%;
}
</style>
