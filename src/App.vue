<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
    <n-message-provider>
      <n-card :content-style="{ padding: 0 }" :bordered="false">
        <router-view />
      </n-card>
      <div class="switch">
        <n-switch v-model:value="active" size="large" @update:value="handleChange">
          <template #checked-icon>
            <n-icon :component="ModeNightFilled" />
          </template>
          <template #unchecked-icon>
            <n-icon :component="LightModeFilled" />
          </template>
        </n-switch>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { zhCN, dateZhCN, darkTheme } from "naive-ui";
import { LightModeFilled, ModeNightFilled } from "@vicons/material";
import { onMounted, ref, watch } from "vue";
import { useThemeStore } from "@/store/theme";
import { useSettingsStore } from "@/store/settings";
const themeStore = useThemeStore();
const settingStore = useSettingsStore();
const theme = ref<any>(themeStore.theme === "dark" ? darkTheme : null);
const active = ref<boolean>(themeStore.theme === "dark" ? true : false);
// watch监听localStorage
watch(themeStore.$state, (_oldVal, newVal) => {
  if (newVal.theme === "dark") {
    theme.value = darkTheme;
  } else {
    theme.value = null;
  }
});
onMounted(() => {
  settingStore.getSettings();
  document.querySelector('link[rel="icon"]')!.setAttribute('href', settingStore.$state.siteSettings.Ico);
});
// 切换主题
const handleChange = () => {
  if (active.value) {
    active.value = true;
    themeStore.toggleTheme();
  } else {
    active.value = false;
    themeStore.toggleTheme();
  }
};
</script>

<style lang="scss" scoped>
::v-deep(.n-card) {
  border-radius: 0;
}

.switch {
  position: absolute;
  right: 30px;
  bottom: 20px;
}
</style>
