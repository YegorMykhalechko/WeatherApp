import axios from 'axios'
export function getCities(value) {
  return axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=cb4e0b33dd2d545452a4caf1edf0f78c`,
    {
      showLoader: false
    }
  )
}
