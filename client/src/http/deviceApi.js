import { $authHost, $host } from './index'

export const createType = async (type) => {
  try {
    const { data } = await $authHost.post('api/type', type)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchTypes = async () => {
  try {
    const { data } = await $host.get('api/type')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createBrand = async (brand) => {
  try {
    const { data } = await $authHost.post('api/brand', brand)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchBrands = async () => {
  try {
    const { data } = await $host.get('api/brand')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createDevice = async (device) => {
  try {
    const { data } = await $authHost.post('api/device', device)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
  try {
    const { data } = await $host.get('api/device', {
      params: {
        typeId,
        brandId,
        page,
        limit
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
export const fetchSingleDevice = async (id) => {
  try {
    const { data } = await $host.get('api/device/' + id)
    return data
  } catch (error) {
    console.log(error)
  }
}
