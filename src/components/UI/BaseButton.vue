<script setup></script>
<template>
  <button class="btn">
    <slot />
  </button>
</template>
<style lang="scss" scoped>
.btn {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  transition: all 0.15s ease-in;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
}
</style>
