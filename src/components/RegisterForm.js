import { useState } from 'react'
import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  //let navigate = useNavigate()

  const [regUser, setRegUser] = useState({
    firstName: '',
    lastName: '',
    zipcode: '',
    age: '',
    userName: '',
    passwordDigest: '',
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
      zipcode: '',
      age: '',
      userName: '',
      passwordDigest: '',
      avatar: ''
    })
    // ADD useNAV to LogIn Page
  }

  const handleChange = (e) => {
    setRegUser({ ...regUser, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form className="Form" onSubmit={handleSubmit}>
        <h1>New User</h1>
        <input
          required
          type="text"
          name="firstName"
          value={regUser.firstName}
          placeholder="First Name"
          onChange={handleChange}
        ></input>
        <input
          required
          type="text"
          name="lastName"
          value={regUser.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        ></input>
        <input
          required
          type="number"
          name="zipcode"
          value={regUser.zipcode}
          placeholder="Zip Code"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="age"
          value={regUser.age}
          placeholder="Age"
          onChange={handleChange}
        ></input>
        <input
          required
          type="text"
          name="userName"
          value={regUser.userName}
          placeholder="User Name"
          onChange={handleChange}
        ></input>
        <input
          required
          type="text"
          name="passwordDigest"
          value={regUser.passwordDigest}
          placeholder="Password"
          onChange={handleChange}
        ></input>
        {/* <input
          type="text"
          name="avatar"
          value={regUser.avatar}
          placeholder="Avatar"
          onChange={handleChange}
        ></input> */}
        <button className="submitButton" text="Submit">
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
