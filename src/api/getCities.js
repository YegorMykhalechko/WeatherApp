import axios from 'axios'
export function getCities(value) {
  return axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=cb4e0b33dd2d545452a4caf1edf0f78c`
  )
  //   return axios.get(
  //     `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=${value}`,
  //     {
  //       headers: {
  //         'X-RapidAPI-Key': 'a3cee251f8msh9e36d1e9d06e1bap1f48bajsn9ab1a1deba44',
  //         'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  //       },
  //       showLoader: false
  //     }
  //   )
}
