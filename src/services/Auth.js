import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/user/login', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/user/new', data)
    console.log('Register new user successful')
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token, if it exists, is valid
    const res = await Client.get('/user/session')
    console.log('From CheckSession in Auth.js', res)
    return res.data
  } catch (error) {
    throw error
  }
}
