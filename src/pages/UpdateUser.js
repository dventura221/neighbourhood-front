import { useState } from 'react'
import Client from '../services/api'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const UpdateUser = (props) => {
  let navigate = useNavigate()
  const [updateUser, setUpdateUser] = useState({
    avatar: ''
  })

  const updateUserHandleChange = async (e) => {
    e.preventDefault()
    const res = await Client.put(
      `http://localhost:3001/user/${props.user.id}/avatar`,
      updateUser
    )
      .then((res) => console.log('update user successful'))
      .catch((err) => console.log(err.data))
    setUpdateUser({
      avatar: ''
    })
    navigate('/streetfeed')
  }

  return (
    <div>
      <Link to="/streetfeed">The Feed</Link>
      <h1>Update @{props.user.userName}'s Avatar</h1>
      <span>
        <img src={props.user.avatar} alt="avatar" className="Avatar" />
      </span>
      <span id="Name">{props.user.firstName}</span>
      <span id="Handle">@{props.user.userName}</span>
      <div>
        <form onSubmit={updateUserHandleChange} className="updateUserForm">
          <input
            required
            type="text"
            value={updateUser.avatar}
            placeholder="Change Avatar"
            onChange={(e) =>
              setUpdateUser({
                ...updateUser,
                avatar: e.target.value
              })
            }
          ></input>
          <button className="submitButton" text="Submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
