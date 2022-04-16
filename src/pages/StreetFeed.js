import axios from 'axios'
import { useState, useEffect } from 'react'
import StreetForm from '../components/StreetForm'
//import { Link } from 'react-router-dom'
import StreetPost from '../components/StreetPost'

const StreetFeed = () => {
  const [allStreets, setAllStreets] = useState([])

  useEffect(() => {
    const getStreets = async () => {
      const res = await axios.get('http://localhost:3001/street/feed')
      console.log(res)
      setAllStreets(res.data)
    }
    getStreets()
  }, [])

  return (
    <div>
      <div>
        <StreetForm />
      </div>
      <div className="allStreetGrid">
        {allStreets.map((street) => (
          <StreetPost authorId={street.authorId} content={street.content} />
        ))}
      </div>
    </div>
  )
}

export default StreetFeed
