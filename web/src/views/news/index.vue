<script setup>
import Search from "./components/search/index.vue";
import NewsItem from "./components/newsItem/index.vue";
import NewsTab from "./components/tabs/index.vue";
import { onMounted, ref } from "vue";
import { getNewsListApi } from "@/apis/News";
const NewsList = ref();
//获取新闻列表
const getNewsList = async () => {
  const res = await getNewsListApi();
  NewsList.value = res.data;
};
//tabs选项卡
const tabs = [
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];

onMounted(() => {
  getNewsList();
});
</script>

<template>
  <div class="news">
    <!--    新闻搜索-->
    <div
      class="news_bar"
      :style="{ backgroundImage: `url(${require('@/assets/img/newsbg.jpg')})` }"
    >
      <!--      新闻搜索-->
      <div class="search">
        <Search :NewsList="NewsList"></Search>
      </div>
    </div>
    <!--    新闻列表-->
    <div class="news_list">
      <NewsItem :NewsList="NewsList"></NewsItem>
    </div>
    <!--    新闻选项卡-->
    <div class="news_tab">
      <NewsTab :tabs="tabs" :NewsList="NewsList"></NewsTab>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news_bar {
  height: 500px;
  background-size: cover;
  .search {
    position: relative;
    top: 180px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
  }
}
.news_list {
  padding: 20px 10px;
}
.news_tab {
  padding: 20px;
}
</style>
