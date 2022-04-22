import { useState } from 'react'
import Client from '../services/api'
import { BASE_URL } from '../services/api'

const StreetForm = (props) => {
  const [streetValues, setStreetValues] = useState({
    content: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await Client.post(
      `${BASE_URL}/street/${props.user.id}/new`,
      streetValues
    )
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setStreetValues({ content: '' })
    props.setCount(props.count + 1)
  }

  const handleChange = (e) => {
    setStreetValues({ ...streetValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="StreetPost">
      <form onSubmit={handleSubmit}>
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
