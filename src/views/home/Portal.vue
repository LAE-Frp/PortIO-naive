<template>
  <div class="flex items-center align-center justify-center h-full">
    <div class="text-center">
      <img class="m-auto" src="/assets/lae-dark.png"
           width="128"/>
      <div class="mt-5">
        <n-h1>
          欢迎使用 PortIO
        </n-h1>
      </div>
      <br/>
      <n-button v-if="!isLogin" type="primary" @click="login">
        登录
      </n-button>
    </div>
  </div>

</template>

<script setup>
import {NButton, NH1, NInput, useOsTheme} from 'naive-ui'
import {computed, ref} from "vue";
import http from '../../plugins/http'
import userStore from '../../plugins/stores/user'
import router from "../../plugins/router.js";

const show = ref(false)

const isLogin = computed(() => {
  return userStore.state.token
})

const osThemeRef = useOsTheme();

function login() {
  router.push({
    name: 'auth.login'
  })
}


</script>
