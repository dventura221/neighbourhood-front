import { useState, useEffect } from 'react'
import { GetStreets } from '../services/PostServices'
import NavBar from '../components/NavBar'
import StreetPost from '../components/StreetPost'
import StreetForm from '../components/StreetForm'
import { gAPI } from '../globals'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const StreetFeed = (props) => {
  let navigate = useNavigate()
  const [count, setCount] = useState(10000)
  const [streetCount, setStreetCount] = useState(10000)

  useEffect(() => {
    const getStreets = async () => {
      const results = await GetStreets()
      props.setAllStreets(results)
    }
    getStreets()
  }, [count, streetCount])

  useEffect(() => {
    const getNews = async () => {
      let response = await axios.get(
        `https://content.guardianapis.com/us/media?key=${gAPI}`
      )
      console.log(response)
    }
    getNews()
  }, [])

  return props.user ? (
    <div className="StreetGrid">
      <div className="NavBar">
        <NavBar user={props.user} handleLogOut={props.handleLogOut} />
      </div>
      <div className="LeftBar">
        <p>Weather API Goes Here</p>
      </div>
      <div className="MainFeed">
        <StreetForm
          user={props.user}
          count={count}
          setCount={setCount}
          streetCount={streetCount}
          setStreetCount={setStreetCount}
        />
        {props.allStreets.map((street) => (
          <StreetPost
            authorId={street.authorId}
            content={street.content}
            key={street.id}
            id={street.id}
            user={props.user}
            firstName={street.User.firstName}
            userName={street.User.userName}
            count={count}
            setCount={setCount}
            streetCount={streetCount}
            setStreetCount={setStreetCount}
            avatar={street.User.avatar}
          />
        ))}
      </div>
      <div className="RightBar">
        <p>News API Goes Here</p>
      </div>
    </div>
  ) : (
    <div className="Protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/')}>Sign In</button>
    </div>
  )
}

export default StreetFeed
