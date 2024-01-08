<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watchEffect, onBeforeUnmount } from "vue";
import { getNewNewsApi, getNewsDetailApi } from "@/apis/News";
import { StarFilled } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
//根据id获取数据
const NewDetail = ref();
const getNewsDetail = async () => {
  const res = await getNewsDetailApi(route.params.id);
  NewDetail.value = res.data[0];
  console.log(NewDetail);
};
//获得最新的四条新闻
const getTopNews = ref();
const getNewNews = async () => {
  const res = await getNewNewsApi(4);
  getTopNews.value = res.data;
  console.log(res.data);
};
const handleRoute = (id) => {
  router.push({ path: `/news/${id}` });
};
const stop = watchEffect(() => {
  if (!route.params.id) return;
  getNewsDetail();
  getNewNews();
});
onBeforeUnmount(() => {
  stop();
});
</script>

<template>
  <div class="news_detail">
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="header">
          <div class="title">
            <h2>{{ NewDetail?.title }}</h2>
            <div class="time">
              {{ NewDetail?.editTime }}
            </div>
          </div>
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div class="content" v-html="NewDetail?.content"></div>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="font-size: 20px; font-weight: 700">最新新闻</span>
            </div>
          </template>
          <div
            v-for="o in getTopNews"
            :key="o._id"
            class="text top_news text1_eliplis"
            @click="handleRoute(o._id)"
            style="cursor: pointer"
          >
            <div class="title">{{ o.title }}</div>
            <div class="time">{{ o.editTime }}</div>
          </div>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.news_detail {
  padding: 20px;
  .header {
    .title {
      font-size: 18px;
    }
    .time {
    }
  }
}
.top_news {
  margin-top: 10px;
  .title {
    font-size: 16px;
  }
  .time {
    margin-top: 4px;
    color: gray;
    font-size: 14px;
  }
}
</style>
