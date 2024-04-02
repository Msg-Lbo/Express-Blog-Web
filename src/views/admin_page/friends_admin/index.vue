<template>
    <div id="friends">
        <n-card :bordered="false">
            <n-button @click="handleFiled">添加友链</n-button>
            <n-tabs type="line" animated>
                <n-tab-pane name="ArticlesList" tab="待审核">
                    <wait></wait>
                </n-tab-pane>
                <n-tab-pane name="editArticle" tab="已通过">
                    <passed></passed>
                </n-tab-pane>
            </n-tabs>
        </n-card>
        <add-friend-model ref="addFriendModalRef" />
    </div>
</template>

<script setup lang='ts'>
import addFriendModel from './components/Model.vue';
import wait from './components/wait.vue';
import passed from './components/passed.vue';
import { ref } from 'vue';
document.title = '友联管理';

const addFriendModalRef = ref();
const handleFiled = () => {
  addFriendModalRef.value.showModalFn();
};
</script>

<style lang='scss' scoped>
#friends {
    ::v-deep(.n-card) {
        background-color: transparent;
    }
}
</style>