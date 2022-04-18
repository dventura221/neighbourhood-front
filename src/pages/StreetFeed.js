//import axios from 'axios'
import { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import { GetStreets } from '../services/PostServices'
import NavBar from '../components/NavBar'
import StreetPost from '../components/StreetPost'
import StreetForm from '../components/StreetForm'
import { useNavigate } from 'react-router-dom'

const StreetFeed = (props) => {
  let navigate = useNavigate()
  const [allStreets, setAllStreets] = useState([])

  useEffect(() => {
    const getStreets = async () => {
      const results = await GetStreets()
      setAllStreets(results)
    }
    getStreets()
  }, [])

  return props.user ? (
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
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/')}>Sign In</button>
    </div>
  )
}

export default StreetFeed
