import axios from 'axios'
import { getAccess } from '../../lib/auth.js'

export const getUserProfile = async () => {
  try {
    const res = await axios.get('/api/profile/', {
      headers: {
        Authorization: `Bearer ${getAccess()}`
      }
    })
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}