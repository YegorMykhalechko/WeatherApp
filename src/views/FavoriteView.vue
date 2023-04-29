<script setup>
import { ref, onMounted } from 'vue'

//API
import { getWeatherData } from '../api/getWeather'
import { getForecastData } from '../api/getForecast'

//Components
import BaseCard from '../components/Cards/BaseCard.vue'
import BaseButton from '../components/UI/BaseButton.vue'

//Store
import { useWeatherBlocksStore } from '../stores/weatherBlocks'

const store = useWeatherBlocksStore()

const getCitiesStorage = ref([])
const dataWeathers = ref([])

onMounted(async () => {
  getCitiesStorage.value = JSON.parse(localStorage.getItem('favorites')) || []
  getCitiesStorage.value.forEach(async (el) => {
    try {
      const resWeather = await getWeatherData(el.lat, el.lon, el.city)
      const resForecast = await getForecastData(el.lat, el.lon, el.city, 7)

      const dataWeather = { ...resWeather.data, ...resForecast.data }

      dataWeathers.value.push(dataWeather)
    } catch (err) {
      console.log(err)
    }
  })
})
</script>

<template>
  <h2>Favorites Weather</h2>
  <div class="empty-box" v-if="!getCitiesStorage.length">
    <h3>Add Favorite Cities</h3>
    <RouterLink to="/">Go Home</RouterLink>
  </div>
  <template v-for="(weather, index) in dataWeathers">
    <BaseCard
      v-if="weather"
      class="mb"
      :key="index"
      :weather="weather"
      :multiple="true"
      :step="store.step"
    />
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
