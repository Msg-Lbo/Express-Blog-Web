<template>
  <div id="sidebar" :style="{ 'background-image': `url(${theme})` }">
    <!-- Logo -->
    <div class="header">
      <div class="logo">
        <img :src="Avatar" alt="" />
        <div class="text-logo">
          <h1>{{ Title }}</h1>
          <p>{{ LogoText }}</p>
        </div>
      </div>
      <div class="menu">
        <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" @update:value="handleMenuChange" />
      </div>
    </div>
    <!-- 备案信息 -->
    <div class="icp">
      <n-space vertical>
        <n-button text tag="a" href="https://beian.miit.gov.cn/" target="_blank" type="primary">
          {{ Ipc }}
        </n-button>
        <n-button text tag="a" href="https://icp.gov.moe/?keyword=20240518" target="_blank" type="primary">
          萌ICP备20240518号
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import type { MenuOption } from "naive-ui";
import { ref, watch } from "vue";
import { useSettingsStore } from "@/store/settings";
import { useThemeStore } from "@/store/theme";
const settingStore = useSettingsStore();
const { Title, Avatar, LogoText, Ipc, LeftBgLight, LeftBgDark } = settingStore.$state.siteSettings;
const activeKey = ref<string | null>(null);
const themeStore = useThemeStore();
const theme = ref<any>(LeftBgLight);
const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "list",
  },
  {
    label: "分类",
    key: "categories",
  },
  {
    label: "时间轴",
    key: "archives",
  },
  {
    label: "友联",
    key: "friends",
  },
  {
    label: "关于",
    key: "about",
  },
];

watch(themeStore.$state, (_oldVal, newVal) => {
  if (newVal.theme === "dark") {
    theme.value = LeftBgDark;
  } else {
    theme.value = LeftBgLight;
  }
});

// 菜单切换触发
const handleMenuChange = (key: string) => {
  activeKey.value = key;
  router.push({ name: key });
};
</script>

<style lang="scss" scoped>
#sidebar {
  height: 100vh;
  font-weight: bold;
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      border-radius: 50%;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 20px;
        cursor: pointer;
        transition: all 0.5s ease-in-out;

        &:hover {
          // 旋转
          transform: rotate(360deg);
        }
      }
    }

    .menu {
      margin: 0 auto;
      text-align: center;
      .n-menu {
        display: flex;
        justify-content: center;
      }
    }
  }

  .icp {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 50px;
    background-color: #00000030;
    backdrop-filter: blur(10px);
    padding: 8px 0;
    text-align: center;
    font-size: 12px;
  }
}

// 宽度小于 1200px 时
@media screen and (max-width: 1200px) {
  #sidebar {
    height: auto;
    background-position: top;

    .logo {
      img {
        width: 70px;
        height: 70px;
      }
    }
  }
}

// 宽度小于 768px 时，头像变小
@media screen and (max-width: 768px) {
  #sidebar {
    .logo {
      img {
        width: 50px;
        height: 50px;
      }
    }

    .icp {
    }
  }
}
</style>
