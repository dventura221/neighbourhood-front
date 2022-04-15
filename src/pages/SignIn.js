import { useState } from 'react'
import axios from 'axios'
import RegisterForm from '../components/RegisterForm'
//import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  //let navigate = useNavigate()

  const [signInValues, setSignInValues] = useState({
    userName: '',
    password: ''
  })

  const handleChange = (e) => {
    setSignInValues({ ...signInValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //const payload = await SignInUser(setSignInValues)
    setSignInValues({ username: '', password: '' })
    //setUser(payload)
    //toggleAuthenticated(true)
    //navigate('/streetfeed')
  }

  return (
    <div>
      <div className="LoginGrid">
        <h1>Sign In</h1>
        <form className="LoginForm" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="User Name"
            value={signInValues.userName}
            placeholder="User Name"
            onChange={handleChange}
          ></input>
          <input
            required
            type="text"
            name="Password"
            value={signInValues.password}
            placeholder="Password"
            onChange={handleChange}
          ></input>
          <button disabled={!signInValues.userName || !signInValues.password}>
            Sign In
          </button>
        </form>
        <div className="RegisterForm">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default SignIn
