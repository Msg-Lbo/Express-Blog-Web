<template>
  <div id="settings">
    <n-card :bordered="false">
      <n-tabs type="line" animated>
        <n-tab-pane name="site settings" tab="站点设置">
          <site-settings />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import siteSettings from "./components/SiteSettings.vue";
document.title = "设置";
</script>

<style lang="scss" scoped>
#settings {
  height: 100%;

  ::v-deep(.n-card) {
    background-color: transparent;
  }
}
</style>
