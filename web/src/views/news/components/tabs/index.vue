<script setup>
import { ref } from "vue";
import { computed } from "vue";
import _ from "lodash";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  tabs: [],
  NewsList: [],
});
const whichTab = ref(1);
//进行分组(lodash的好用性质)
const tabGroup = computed(() =>
  _.groupBy(props.NewsList, (item) => item.category)
);
//处理路由跳转到新闻详情页
const handleRouter = (id) => {
  router.push({ path: `/news/${id}` });
};
</script>

<template>
  <el-tabs v-model="whichTab" class="demo-tabs">
    <el-tab-pane
      v-for="item in tabs"
      :label="item.label"
      :name="item.name"
      :key="item.name"
    >
      <el-row :gutter="20">
        <el-col :span="18"
          ><div class="grid-content ep-bg-purple" />
          <el-card
            v-for="items in tabGroup[item.name]"
            :key="items._id"
            shadow="hover"
            :style="{ marginTop: '16px' }"
          >
            <div class="news" @click="handleRouter(items._id)">
              <div class="left">
                <img
                  class="image"
                  :src="`http://localhost:3000${items.cover}`"
                  alt=""
                />
              </div>
              <div class="right">
                {{ items.title }}
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6"
          ><div class="grid-content ep-bg-purple timeline" />
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in tabGroup[item.name]"
              :key="index"
              :timestamp="activity.timestamp"
              @click="handleRouter(activity._id)"
              style="cursor: pointer"
            >
              {{ activity.title }}
            </el-timeline-item>
          </el-timeline></el-col
        >
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.news {
  display: flex;
  align-items: center;
  .left {
    height: 100px;
    width: 100px;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    margin-left: 10px;
  }
}
.el-row > .el-col:last-child {
  margin-top: 20px;
}
</style>
