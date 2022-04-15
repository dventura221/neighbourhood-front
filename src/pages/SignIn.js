import { useState } from 'react'
import axios from 'axios'
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
    <div className="signIn">
      <h1>Sign In!</h1>
      <div className="signInGrid">
        <form className="signInForm" onSubmit={handleSubmit}>
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
      </div>
      <div className="registerUser"></div>
    </div>
  )
}

export default SignIn
