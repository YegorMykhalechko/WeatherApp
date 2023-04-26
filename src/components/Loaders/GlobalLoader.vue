<script setup>
import BaseSpinner from './BaseSpinner.vue'
</script>

<template>
  <div class="spin">
    <div class="ring">
      <BaseSpinner />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spin {
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
}
.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 auto;
  height: 100%;
}
</style>
