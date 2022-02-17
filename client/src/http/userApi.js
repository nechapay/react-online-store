import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
  try {
    const { data } = await $host.post('api/user/registration', { email, password, role: 'user' })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  } catch (error) {
    console.log(error)
  }
}

export const login = async (email, password) => {
  try {
    const { data } = await $host.post('api/user/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  } catch (error) {
    console.log(error)
  }
}

export const check = async () => {
  try {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  } catch (error) {
    console.log(error)
  }
}
