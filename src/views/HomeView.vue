<script setup>
import { onMounted, ref } from 'vue'
import { notify } from '@kyvg/vue3-notification'

//API
import { getWeatherData } from '../api/getWeather'
import { getForecastData } from '../api/getForecast'
import { getIpData } from '../api/getIp'

//Components
import SearchCity from '../components/SearchCity.vue'
import BaseCard from '../components/Cards/BaseCard.vue'
import BaseIcon from '../components/IconVue/BaseIcon.vue'
import BaseModal from '../components/Modals/BaseModal.vue'
import BaseButton from '../components/UI/BaseButton.vue'

const currentWeather = ref(null)
const currentForecast = ref(null)
const currentDataWeather = ref(null)
const dataWeathers = ref([])
const showModal = ref(false)
const showInformModal = ref(false)

//Get Weather IP
onMounted(async () => {
  try {
    const res = await getIpData()
    const lat = res.data.latitude
    const lon = res.data.longitude
    const city = res.data.city
    await setCurrentData(lat, lon, city)
  } catch (err) {
    console.log(err)
  }
})

const setCurrentData = async (lat, lon, city) => {
  try {
    const resWeather = await getWeatherData(lat, lon, city)
    currentWeather.value = resWeather.data

    const resForecast = await getForecastData(lat, lon, city)
    currentForecast.value = resForecast.data

    currentDataWeather.value = { ...currentWeather.value, ...currentForecast.value }
  } catch (err) {
    console.log(err)
  }
}

const setNewData = async (lat, lon, city) => {
  try {
    const resWeather = await getWeatherData(lat, lon, city)
    const resForecast = await getForecastData(lat, lon, city)

    const weather = { ...resWeather.data, ...resForecast.data }

    const isDuplicateCity = dataWeathers.value.some((el) => {
      return el.id === weather.id
    })

    if (!isDuplicateCity) {
      dataWeathers.value.unshift(weather)
    }

    if (isDuplicateCity) {
      notify({
        title: 'Oooops',
        text: 'This city has already been added',
        type: 'error',
        duration: 3000
      })
      showModal.value = false
    }

    if (dataWeathers.value.length >= 5) {
      notify({
        title: 'Oooops',
        text: 'Max 5 cities',
        type: 'error',
        duration: 3000
      })
      showModal.value = false
    }
  } catch (err) {
    console.log(err)
  }
}

const parseSearch = (data) => {
  const [lat, lon] = data.value.split(' ')
  const city = data.name
  return [lat, lon, city]
}

const getCurrentCityData = async (data) => {
  const [lat, lon, city] = parseSearch(data)

  await setCurrentData(lat, lon, city)
}

const scrollToNewBlock = () => {
  const element = document.getElementById('newBlock')
  element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
}

const getNewCityData = async (data) => {
  const [lat, lon, city] = parseSearch(data)

  await setNewData(lat, lon, city)

  showModal.value = false

  scrollToNewBlock()
}

const deleteWeatherCard = (data) => {
  dataWeathers.value = dataWeathers.value.filter((el) => {
    return el.id !== data
  })
}
</script>

<template>
  <SearchCity class="mb" @getCity="getCurrentCityData" />

  <BaseCard class="mb" v-if="currentDataWeather" :weather="currentDataWeather"></BaseCard>

  <BaseButton class="mb" @click="showModal = true">
    <BaseIcon class="plus-icon" icon="plus" />
  </BaseButton>

  <template v-for="(weather, index) in dataWeathers">
    <BaseCard
      @deleteCard="deleteWeatherCard"
      class="mb"
      id="newBlock"
      :key="index"
      v-if="weather"
      :weather="weather"
      :multiple="true"
    />
  </template>

  <Transition name="modal">
    <BaseModal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <h3>Add new weather block</h3>
      </template>
      <template v-slot:body>
        <SearchCity @getCity="getNewCityData" />
      </template>
    </BaseModal>
  </Transition>
</template>

<style lang="scss" scoped>
.search {
  margin-bottom: 16px;
}
</style>
