import { useState } from 'react'
import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const StreetForm = () => {
  // let navigate = useNavigate()
  const [streetValues, setStreetValues] = useState({
    content: ''
  })

  const handleSubmit = (e) => {
    //e.preventDefault()
    axios
      .post(`http://localhost:3001/street/1/new`, streetValues)
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setStreetValues({ content: '' })
  }

  const handleChange = (e) => {
    setStreetValues({ ...streetValues, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>Create New Street</h2>
      <form onSubmit={handleSubmit} className="StreetForm">
        <textarea
          rows="3"
          required
          type="text"
          name="content"
          value={streetValues.content}
          placeholder="Content"
          onChange={handleChange}
        ></textarea>
        <button className="submitButton">Submit</button>
      </form>
    </div>
  )
}

export default StreetForm
