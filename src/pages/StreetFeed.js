import axios from 'axios'
import { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import StreetPost from '../components/StreetPost'
import StreetForm from '../components/StreetForm'

const StreetFeed = () => {
  const [allStreets, setAllStreets] = useState([])

  useEffect(() => {
    const getStreets = async () => {
      const res = await axios.get('http://localhost:3001/street/feed')
      setAllStreets(res.data)
    }
    getStreets()
  }, [])

  return (
    <div className="StreetGrid">
      <div className="NavBar">
        <NavBar />
      </div>
      <div className="LeftBar">
        <p>Weather API Goes Here</p>
      </div>
      <div className="MainFeed">
        <StreetForm />
        <div className="StreetMap">
          {allStreets.map((street) => (
            <StreetPost
              authorId={street.authorId}
              content={street.content}
              key={street.id}
              id={street.id}
            />
          ))}
        </div>
      </div>
      <div className="RightBar">
        <p>News API Goes Here</p>
      </div>
    </div>
  )
}

export default StreetFeed
