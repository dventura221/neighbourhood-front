import { useState } from 'react'
import Client from '../services/api'
//import { useNavigate } from 'react-router-dom'

const StreetForm = (props) => {
  // let navigate = useNavigate()
  const [streetValues, setStreetValues] = useState({
    content: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    Client.post(
      `http://localhost:3001/street/${props.user.id}/new`,
      streetValues
    )
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setStreetValues({ content: '' })
    props.getStreets()
  }

  const handleChange = (e) => {
    setStreetValues({ ...streetValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="StreetPost">
      <form onSubmit={handleSubmit}>
        <p>
          Jane Doe <span id="Handle">@user_name</span>
        </p>
        <textarea
          rows="3"
          required
          type="text"
          name="content"
          value={streetValues.content}
          placeholder="How's it going?"
          onChange={handleChange}
        ></textarea>
        <button id="StreetButton">Street</button>
      </form>
    </div>
  )
}

export default StreetForm
