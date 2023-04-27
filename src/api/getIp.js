import axios from 'axios'

export function getIpData() {
  return axios.get(
    `${import.meta.env.VITE_SERVER_IP_URL}/ipgeo?apiKey=${import.meta.env.VITE_SERVER_IP_API_KEY}`
  )
}
