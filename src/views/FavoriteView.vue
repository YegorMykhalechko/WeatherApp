<script setup>
import { ref, onMounted } from 'vue'
//Components
import BaseCard from '../components/Cards/BaseCard.vue'

const getCitiesStorage = ref([])

onMounted(() => {
  getCitiesStorage.value = JSON.parse(localStorage.getItem('favorites')) || []
})
</script>

<template>
  <h2>Favorites Weather</h2>
  <template v-for="(weather, index) in getCitiesStorage">
    <BaseCard
      v-if="weather"
      class="mb"
      :key="index"
      :weather="weather"
      :multiple="true"
    />
  </template>
</template>

<style lang="scss" scoped></style>
