<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <el-button type="primary" @click="counterStore.increment">increase</el-button>
  <el-button type="primary" @click="resetSync">同步重置</el-button>
  <el-button type="primary" @click="resetAsync">异步重置</el-button>
  <p>{{ counterStore.count }} : {{ counterStore.double }}</p>
  <HelloWorld msg="Vite + Vue" />

  <el-config-provider :locale="zhCn" size="default">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
//import HelloWorld from '@/components/HelloWorld.vue'
import { useCounterStore } from "@/store/counter";
import zhCn from "element-plus/es/locale/lang/zh-cn";
const counterStore = useCounterStore();

const resetSync = () => {
  counterStore.$patch({
    count: 0,
  });
};

const resetAsync = () => {
  counterStore.$patch((state) => {
    setTimeout(() => {
      state.count = 0;
    }, 1000);
  });
};

counterStore.$subscribe(() => {
  console.log(counterStore.count);
  console.log(counterStore.double);
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
