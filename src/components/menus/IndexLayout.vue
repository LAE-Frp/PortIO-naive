<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import {
  addMenuOptions,
  removeAllMenuOptionsThen,
} from '../../plugins/menuOptions.js'

import {
  HomeOutline,
} from '@vicons/ionicons5'
import {
  MonitorHeartFilled,
  SupportAgentRound,
} from '@vicons/material'

removeAllMenuOptionsThen('left', () => {
  // 注册菜单
  addMenuOptions('left', 'index', '首页', HomeOutline)
  addMenuOptions('left', 'status', '监控', MonitorHeartFilled)
  addMenuOptions('left', 'work-orders', '工单', SupportAgentRound)
})
</script>
