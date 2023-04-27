<script setup>
import { ref, onMounted } from 'vue'
//Components
import BaseCard from '../components/Cards/BaseCard.vue'
import BaseButton from '../components/UI/BaseButton.vue'

const getCitiesStorage = ref([])

onMounted(() => {
  getCitiesStorage.value = JSON.parse(localStorage.getItem('favorites')) || []
})
</script>

<template>
  <h2>Favorites Weather</h2>
  <div class="empty-box" v-if="!getCitiesStorage.length">
    <h3>Add Favorite Cities</h3>
    <RouterLink to="/">Go Home</RouterLink>
  </div>
  <template v-for="(weather, index) in getCitiesStorage">
    <BaseCard v-if="weather" class="mb" :key="index" :weather="weather" :multiple="true" />
  </template>
</template>

<style lang="scss" scoped>
.empty-box {
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  font-size: 28px;
  padding: 36px;
  border-radius: 30px;

  a {
    text-decoration: none;
    color: #000;
    &:hover {
      color: #00afea;
    }
  }
}
</style>
