import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const SignIn = (props) => {
  let navigate = useNavigate()

  const [signInValues, setSignInValues] = useState({
    userName: '',
    password: ''
  })
  const [justRegistered, setJustRegistered] = useState(false)

  const handleChange = (e) => {
    setSignInValues({ ...signInValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(signInValues)
    setSignInValues({ userName: '', password: '' })
    props.setUser(payload)
    navigate('/streetfeed')
  }

  return (
    <div>
      <h1 id="Title">
        Neighbo<span>u</span>rly
      </h1>
      <div className="GridContainer">
        <div className="LoginGrid">
          <form className="Form" onSubmit={handleSubmit}>
            <h1 className="LoginText">Sign In</h1>
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
              type="password"
              name="password"
              value={signInValues.password}
              placeholder="Password"
              onChange={handleChange}
            ></input>
            <button>Sign In</button>
          </form>
          <div>
            {justRegistered ? (
              'Registration Successful. Please Sign In.'
            ) : (
              <RegisterForm setJustRegistered={setJustRegistered} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
