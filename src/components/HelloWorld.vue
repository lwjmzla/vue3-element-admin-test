<template>
  <h1>{{ msg }}</h1>
  <p>{{ counterStore.count }} : {{ counterStore.double }}</p>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <div>
    <el-button type="primary">Info</el-button>
    <el-button type="success">
      Success
      <el-icon color="#409EFC" class="no-inherit">
        <i-ep-share />
      </el-icon>
    </el-button>
    <el-button type="info"><i-ep-InfoFilled />Info</el-button>
    <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
    <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
    <el-button type="info">
      <svg-icon icon-class="vue" color="red" />SVG 本地图标
    </el-button>
  </div>
</template>

<script setup lang="ts">
import variables from "@/styles/variables.module.scss";
console.log(variables);
import { useCounterStore } from "@/store/counter";
import { getCaptchaApi } from "@/api/index";
const counterStore = useCounterStore();
//import { ref } from 'vue'
//import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
defineProps<{ msg: string }>();
console.log(import.meta.env.VITE_APP_BASE_API);

/**
 * 获取验证码
 */
function getCaptcha() {
  getCaptchaApi().then(({ data }) => {
    const { verifyCodeBase64, verifyCodeKey } = data;
    console.log(verifyCodeBase64, verifyCodeKey);
  });
}

onMounted(() => {
  getCaptcha();
});

const count = ref(0);
</script>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
  background-color: $bg-color;
}
</style>
