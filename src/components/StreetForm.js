import { useState } from 'react'
import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const StreetForm = () => {
  // let navigate = useNavigate()
  const [streetValues, setStreetValues] = useState({
    content: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // axios
    //  .post(`http://localhost:3001/user/new`, streetValues)
    // .then((res) => console.log('successful'))
    // .catch((err) => console.log(err.data))
    setStreetValues({ content: '' })
  }

  const handleChange = (e) => {
    setStreetValues({ ...streetValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="streetFormComp">
      <h2>Create New Street</h2>
      <form onSubmit={handleSubmit} className="streetForm">
        <input
          required
          type="text"
          name="Content"
          value={streetValues.content}
          placeholder="Content"
          onChange={handleChange}
        ></input>
        <button disabled={!streetValues.content}>Submit</button>
      </form>
    </div>
  )
}

export default StreetForm
