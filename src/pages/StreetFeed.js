//import axios from 'axios'
import { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import { GetStreets } from '../services/PostServices'
import StreetPost from '../components/StreetPost'
import StreetForm from '../components/StreetForm'

const StreetFeed = () => {
  const [allStreets, setAllStreets] = useState([])

  useEffect(() => {
    const getStreets = async () => {
      const results = await GetStreets()
      setAllStreets(results)
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
          <StreetPost
            authorId={street.authorId}
            content={street.content}
            key={street.id}
            id={street.id}
          />
        ))}
      </div>
    </div>
  )
}

export default StreetFeed
