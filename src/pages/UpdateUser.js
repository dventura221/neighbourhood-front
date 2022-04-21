import { useState } from 'react'
import Client from '../services/api'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const UpdateUser = (props) => {
  let navigate = useNavigate()
  const [updateAvatar, setUpdateAvatar] = useState({
    avatar: ''
  })
  const [updatePassword, setUpdatePassword] = useState({
    password: '',
    confirmPassword: ''
  })

  const updateUserHandleChange = async (e) => {
    e.preventDefault()
    const res = await Client.put(
      `http://localhost:3001/user/${props.user.id}/avatar`,
      updateAvatar
    )
      .then((res) => console.log('update user successful'))
      .catch((err) => console.log(err.data))
    setUpdateAvatar({
      avatar: ''
    })
    navigate('/streetfeed')
  }

  const updatePasswordHandleChange = async (e) => {
    e.preventDefault()
    const res = await Client.put(
      `http://localhost:3001/user/${props.user.id}/password`,
      { password: updatePassword.password }
    )
      .then((res) => console.log('update password successful'))
      .catch((err) => console.log(err.data))
    setUpdateAvatar({
      password: '',
      confirmPassword: ''
    })
    navigate('/')
  }

  return (
    <div>
      <Link to="/streetfeed">The Feed</Link>
      <h1>Update {props.user.firstName}'s Avatar</h1>
      <div className="ProfileGrid">
        <img src={props.user.avatar} alt="avatar" className="Avatar" />
        <span id="Handle">@{props.user.userName}</span>
        <div className="UpdateAvatarForm">
          <form onSubmit={updateUserHandleChange}>
            <input
              required
              type="text"
              value={updateAvatar.avatar}
              placeholder="Change Avatar"
              onChange={(e) =>
                setUpdateAvatar({
                  ...updateAvatar,
                  avatar: e.target.value
                })
              }
            ></input>
            <button className="submitButton" text="Submit">
              Submit
            </button>
          </form>
        </div>
        <div className="UpdatePasswordForm">
          <form onSubmit={updatePasswordHandleChange}>
            <input
              required
              type="text"
              value={updatePassword.password}
              placeholder="Change Password"
              onChange={(e) =>
                setUpdatePassword({
                  ...updatePassword,
                  password: e.target.value
                })
              }
            ></input>
            <input
              required
              type="text"
              value={updatePassword.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) =>
                setUpdatePassword({
                  ...updatePassword,
                  confirmPassword: e.target.value
                })
              }
            ></input>
            <button
              className="submitButton"
              text="Submit"
              disabled={
                updatePassword.password !== updatePassword.confirmPassword
              }
            >
              Submit New Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser
