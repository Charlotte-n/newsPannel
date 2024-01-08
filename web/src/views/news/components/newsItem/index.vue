<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
// eslint-disable-next-line no-undef
const props = defineProps({
  NewsList: [],
});
const handleChange = (id) => {
  router.push({ path: `/news/${id}` });
};
onMounted(() => {});
</script>

<template>
  <el-row :gutter="20">
    <el-col
      :span="6"
      v-for="item in props.NewsList"
      :key="item.id"
      @click="handleChange(item._id)"
    >
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <img :src="`http://localhost:3000/${item.cover}`" class="image" />
        <div style="padding: 14px">
          <span class="text1_eliplis">{{ item?.title }}</span>
          <div class="bottom">
            <time class="time">{{ item?.editTime }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.image {
  height: 150px;
  width: 100%;
}
</style>
