<template>
  <div id="archives">
    <n-scrollbar style="max-height: calc(100vh - 80px)" @scroll="handleScroll">
      <div class="archives-container">
        <n-timeline size="large">
          <n-timeline-item content="嗯?" />
          <n-timeline-item
            v-for="item in articleList"
            type="success"
            :content="item.title"
            :time="timestampToTime(item.create_time)"
            :key="item.id"
            @click="toOtherPage(item.id)"
            style="cursor: pointer"
          />
          <n-timeline-item type="warning" v-if="page >= count" content="没有了啦,别翻了" />
          <n-timeline-item type="info" v-else content="等一等,还有一点点" />
        </n-timeline>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { getAllArticleApi } from "@/apis/article";
import { debounce } from "@/utils/debounce";
import { onMounted, ref } from "vue";
const page = ref(1);
const pageSize = ref(25);
const count = ref(0);
onMounted(() => {
  getArticleList();
  document.title = "一楼没太阳 | 归档";
});
const toOtherPage = (otherId: number) => {
  // 打开新页面
  window.open(`/detail?id=${otherId}`, "_blank");
};
const handleScroll = debounce((e: Event) => {
  if (page.value === count.value) return;
  const height = (e.target as HTMLElement).getBoundingClientRect().height;
  const scrollTop = (e.target as HTMLElement).scrollTop;
  const scrollHeight = (e.target as HTMLElement).scrollHeight;
  if (scrollHeight - scrollTop - height < 90) {
    page.value++;
    getArticleList();
  }
}, 500);

// 获取文章列表
const articleList = ref<any>([]);
const getArticleList = async () => {
  const res = await getAllArticleApi(page.value, pageSize.value);
  articleList.value.push(...res.data.list);
  count.value = res.data.total;
};

/**
 * 时间戳转换为时间
 * @param timestamp 时间戳(毫秒)
 */
const timestampToTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + "-";
  const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
  const D = date.getDate() + " ";
  const h = date.getHours() + ":";
  const m = date.getMinutes() + ":";
  const s = date.getSeconds();
  return Y + M + D + h + m + s;
};
</script>

<style lang="scss" scoped>
#archives {
  .archives-container {
  }
}

// 小于768px时
@media screen and (max-width: 768px) {
  #archives {
    ::v-deep(.n-scrollbar) {
      max-height: calc(100vh - 120px) !important;
    }
  }
}
</style>
