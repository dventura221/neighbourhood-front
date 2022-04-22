import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetStreets } from '../services/PostServices'
import { nAPI, tAPI } from '../globals'
import NavBar from '../components/NavBar'
import StreetPost from '../components/StreetPost'
import StreetForm from '../components/StreetForm'
import NewsCard from '../components/NewsCard'
import WeatherCard from '../components/WeatherCard'
import axios from 'axios'

const StreetFeed = (props) => {
  let navigate = useNavigate()
  const [count, setCount] = useState(10000)
  const [streetCount, setStreetCount] = useState(10000)
  const [newsArticles, setNewsArticles] = useState([])

  useEffect(() => {
    const getStreetsAndNews = async () => {
      const results = await GetStreets()
      props.setAllStreets(results)
      //console.log(results)
      let response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${nAPI}&country=us&domain=theguardian`
      )
      console.log(response.data)
      setNewsArticles(response.data.results)
    }
    getStreetsAndNews()
  }, [count, streetCount])

  return props.user ? (
    <div className="StreetGrid">
      <div className="NavBar">
        <NavBar user={props.user} handleLogOut={props.handleLogOut} />
      </div>
      <div className="LeftBar">
        <WeatherCard />
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
            created={street.createdAt}
            edited={street.isEdited}
            updated={street.updatedAt}
          />
        ))}
      </div>
      <div className="RightBar">
        <div>
          {newsArticles.map(
            (article) =>
              article.image_url !== null && (
                <NewsCard
                  key={article.title}
                  title={article.title}
                  description={article.description}
                  image={article.image_url}
                  url={article.link}
                  source={article.source_id}
                />
              )
          )}
        </div>
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
