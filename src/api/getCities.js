import axios from 'axios'
export function getCities(value) {
  return axios.get(
    `${import.meta.env.VITE_SERVER_WEATHER_URL}/geo/1.0/direct?q=${value}&limit=5&appid=${
      import.meta.env.VITE_SERVER_WEATHER_API_KEY
    }`,
    {
      showLoader: false
    }
  )
}
