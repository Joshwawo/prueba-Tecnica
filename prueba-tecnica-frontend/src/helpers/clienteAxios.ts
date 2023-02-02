import axios from 'axios'

export const clientAxios = axios.create({
  baseURL: `https://api-prodt.up.railway.app`,
  headers: {
    'Content-Type': 'application/json',
    
  },
})

