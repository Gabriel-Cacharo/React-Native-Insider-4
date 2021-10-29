import axios from 'axios'

export const key = '7f4a627aea72fee5490f89a67739f4f6'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default api