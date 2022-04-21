import { useState } from 'react'
import Client from '../services/api'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../services/api'

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
      `${BASE_URL}/user/${props.user.id}/avatar`,
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
    const res = await Client.put(`${BASE_URL}/user/${props.user.id}/password`, {
      password: updatePassword.password
    })
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
      <div className="ProfileNav">
        <Link to="/streetfeed">The Feed</Link>
        <h1 id="ProfileTitle">{props.user.firstName}'s Account</h1>
      </div>
      <div className="ProfileContainer">
        <div className="ProfileGrid">
          <img src={props.user.avatar} alt="avatar" id="UserAvatar" />
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
              <button className="SubmitButton" text="Submit">
                Submit
              </button>
            </form>
          </div>
          <div className="UpdatePasswordForm">
            <form onSubmit={updatePasswordHandleChange}>
              <p id="ProfileHandle">@{props.user.userName}</p>
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
                className="SubmitButton"
                text="Submit"
                disabled={
                  updatePassword.password !== updatePassword.confirmPassword
                }
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser
