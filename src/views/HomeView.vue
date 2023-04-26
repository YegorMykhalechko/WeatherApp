<script setup>
import { ref } from 'vue'

//API
import { getWeatherData } from '../api/getWeather'
import { getForecastData } from '../api/getForecast'

//Components
import SearchCity from '../components/HomeComponents/SearchCity.vue'

const currentWeather = ref(null)
const currentForecast = ref(null)

const setData = async (lat, lon, city) => {
  try {
    const resWeather = await getWeatherData(lat, lon, city)
    currentWeather.value = resWeather.data

    const resForecast = await getForecastData(lat, lon, city)
    currentForecast.value = resForecast.data
  } catch (err) {
    console.log(err)
  }
}

const getCityData = async (data) => {
  const [lat, lon] = data.value.split(' ')
  const city = data.name

  await setData(lat, lon, city)
}

const dateBuilder = () => {
  let newDate = new Date()
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  let day = days[newDate.getDay()]
  let date = newDate.getDate()
  let month = months[newDate.getMonth()]
  let year = newDate.getFullYear()

  return `${day} ${date} ${month} ${year}`
}
</script>

<template>
  <h1>Hello</h1>
  <SearchCity @getCity="getCityData" />
  <div v-if="currentWeather" class="weather-wrap">
    <div class="location-box">
      <div class="location">{{ currentWeather?.name }}, {{ currentWeather?.sys?.country }}</div>
      <div class="date">{{ dateBuilder() }}</div>
    </div>
    <div class="weather-box">
      <div class="temp">{{ Math.round(currentWeather?.main?.temp) }}°C</div>
      <div class="weather">{{ currentWeather?.weather[0]?.main }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather-wrap {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 24px 12px;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.25);
  .location-box {
    text-align: center;
    .location {
      color: #000;
      font-size: 32px;
      font-weight: 500;
      text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }

    .date {
      color: #000;
      font-size: 20px;
      font-weight: 300;
      font-style: italic;
      text-align: center;
    }
  }

  .weather-box {
    text-align: center;
    .temp {
      display: inline-block;
      padding: 10px 25px;
      color: #000;
      font-size: 102px;
      font-weight: 900;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      margin: 30px 0px;
      box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    }

    .weather {
      color: #000;
      font-size: 48px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
