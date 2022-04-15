import { useState } from 'react'
import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [regUser, setRegUser] = useState({
    firstName: '',
    lastName: '',
    zipcode: undefined,
    age: undefined,
    userName: '',
    password: '',
    avatar: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`http://localhost:3001/user/new`, regUser)
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setRegUser({
      firstName: '',
      lastName: '',
      zipcode: undefined,
      age: undefined,
      userName: '',
      password: '',
      avatar: ''
    })
    // ADD useNAV to LogIn Page
  }

  const handleChange = (e) => {
    setRegUser({ ...regUser, [e.target.name]: e.target.value })
  }

  return (
    <div className="registerUser">
      <h1>Register New User</h1>
      <form onSubmit={handleSubmit} className="registerForm">
        <input
          required
          type="text"
          name="First Name"
          value={regUser.firstName}
          placeholder="First Name"
          onChange={handleChange}
        ></input>
        <input
          required
          type="text"
          name="Last Name"
          value={regUser.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        ></input>
        <input
          required
          type="number"
          name="Zip Code"
          value={regUser.zipcode}
          placeholder="Zip Code"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="Age"
          value={regUser.age}
          placeholder="Age"
          onChange={handleChange}
        ></input>
        <input
          required
          type="text"
          name="User Name"
          value={regUser.userName}
          placeholder="User Name"
          onChange={handleChange}
        ></input>
        <input
          required
          type="text"
          name="Password"
          value={regUser.password}
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="Avatar"
          value={regUser.avatar}
          placeholder="Avatar"
          onChange={handleChange}
        ></input>
        <button className="submitButton" text="Submit">
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
