<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const props = defineProps({
  NewsList: [],
});
const content = ref("");
const visible = ref(false);
const onChange = () => {
  visible.value = true;
};
</script>

<template>
  <div class="search">
    <el-popover
      placement="bottom"
      title="搜索结果"
      width="48%"
      :visible="visible"
    >
      <template #reference>
        <el-input
          v-model="content"
          placeholder="请输入关键词"
          class="input-with-select"
          type="search"
          @input="onChange"
        >
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </template>
    </el-popover>
  </div>
</template>

<style scoped lang="scss"></style>
