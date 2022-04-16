import Client from './api'

export const GetStreets = async () => {
  try {
    const res = await Client.get('/street/feed')
    return res.data
  } catch (error) {
    throw error
  }
}
