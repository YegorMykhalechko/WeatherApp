import axios from 'axios'

export function getWeatherData(lat, lon, city) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&q=${city}&appid=cb4e0b33dd2d545452a4caf1edf0f78c&units=metric`
  )
}
