<template>
    <n-input-group>
        <n-input-group-label>控制面板主题颜色</n-input-group-label>
        <n-color-picker v-model:value="theme_color"/>
        <n-button secondary strong type="success" @click="update_theme_color()">更新</n-button>
        <n-button secondary strong type="error" @click="reset_theme_color()">重置</n-button>
    </n-input-group>
</template>

<script setup>
import {NButton, NColorPicker, NInputGroup, NInputGroupLabel, useMessage} from 'naive-ui'

import {ref} from 'vue'

import app from '../plugins/stores/app'

import {addMenuOptions, removeAllMenuOptionsThen,} from '../plugins/menuOptions.js'

import {SettingsOutline} from '@vicons/ionicons5'

removeAllMenuOptionsThen('left', () => {
    // 注册菜单
    addMenuOptions('left', 'settings', '设置', SettingsOutline)
})

const theme_color = ref(app.state.theme_color)
const message = useMessage()

const update_theme_color = () => {
    app.commit("update_color", theme_color.value)
    message.success("保存成功")
    location.reload()
}

const reset_theme_color = () => {
    theme_color.value = "#18A058FF"
    app.commit("update_color", "#18A058FF")
    message.success("重置成功")
    location.reload()
}
</script>

<style scoped>

</style>