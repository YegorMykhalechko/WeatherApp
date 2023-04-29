import { defineStore } from 'pinia'

export const useWeatherBlocksStore = defineStore('weather', {
  state: () => {
    return {
      currentWeather: null,
      weathersBlocks: [],
      step: true
    }
  }
})
