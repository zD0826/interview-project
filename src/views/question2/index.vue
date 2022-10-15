<script setup lang="ts">
import { ref } from 'vue'
import { queryOrder } from '@/api/order'

type OrderResult = '成功' | '失败'

const apiResult = ref()
const orderResult = ref<OrderResult>()

queryOrder().then(res => {
  const { data } = res
  apiResult.value = data
  if (data.code === 1000) {
    // 订单成功
  } else if (data.code === -1000) {
    // 订单失败
  } else {
    // 未知状态，重新查询
  }
})
</script>

<template>
  <h1>订单结果：{{ orderResult || '-' }}</h1>
  <h2>API 调用结果:</h2>
  <pre class="bg-[hsl(220_18%_10%)] rounded-2 p-4 text-#9cdcfe">{{ apiResult ? JSON.stringify(apiResult, null, 2) : '' }}</pre>
</template>