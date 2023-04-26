import axios from 'axios'

export function getIpData() {
  return axios.get('https://api.ipify.org?format=json')
}
