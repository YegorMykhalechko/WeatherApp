import axios from 'axios'

export function getForecastData(lat, lon, city) {
  return axios.get(
    `${
      import.meta.env.VITE_SERVER_WEATHER_URL
    }/data/2.5/forecast?lat=${lat}&lon=${lon}&q=${city}&appid=${
      import.meta.env.VITE_SERVER_WEATHER_API_KEY
    }&units=metric`
  )
}
