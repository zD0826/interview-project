<script lang="ts" setup>
</script>

<template>
  <ul class="leading-8">
    <li class="list-none">
      <router-link to="/question1">
        <el-link :underline="false" type="primary">Question1</el-link>
      </router-link>
    </li>
    <li class="list-none">
      <router-link to="/question2">
        <el-link :underline="false" type="primary">Question2</el-link>
      </router-link>
    </li>
  </ul>
</template>
