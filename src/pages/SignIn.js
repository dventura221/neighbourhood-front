import { useState } from 'react'
// import axios from 'axios'
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
    <div className="GridContainer">
      <div className="LoginGrid">
        <form className="Form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input
            required
            type="text"
            name="userName"
            value={signInValues.userName}
            placeholder="User Name"
            onChange={handleChange}
          ></input>
          <input
            required
            type="text"
            name="password"
            value={signInValues.password}
            placeholder="Password"
            onChange={handleChange}
          ></input>
          <button>Sign In</button>
        </form>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default SignIn
