<script setup>
//Components
import BaseButton from './UI/BaseButton.vue'

const emit = defineEmits(['changeStep'])
const props = defineProps(['step'])

const getDayStep = () => {
  emit('changeStep', true)
}
const getFullStep = () => {
  emit('changeStep', false)
}
</script>

<template>
  <div class="step-box">
    <BaseButton :disabled="props.step" @click="getDayStep">Day</BaseButton>
    <BaseButton :disabled="!props.step" @click="getFullStep">5 Days</BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.step-box {
  display: flex;
  width: 200px;
  margin-bottom: 16px;
  button {
    margin: 0 8px;
  }
}
</style>
