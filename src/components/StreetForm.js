import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const StreetForm = () => {
  // let navigate = useNavigate()
  const [streetValues, setStreetValues] = useState({
    content: ''
  })
  const [isClicked, setClicked] = useState(false)

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

  const changeStyle = (e) => {
    e.preventDefault()
    setClicked(!isClicked)
  }

  return (
    <div className="StreetPost">
      <form onSubmit={handleSubmit}>
        <p>
          Jane Doe <span>@user_name</span>
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
        {!isClicked ? (
          <FontAwesomeIcon
            icon={faHeartRegular}
            id="RegHeart"
            pull="left"
            onClick={changeStyle}
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeartSolid}
            id="SolidHeart"
            pull="left"
            onClick={changeStyle}
          />
        )}
        <button id="StreetButton">Street</button>
      </form>
    </div>
  )
}

export default StreetForm
