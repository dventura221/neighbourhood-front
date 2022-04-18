import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'
//import NavBar from './components/NavBar'
//import RegisterForm from './components/RegisterForm'
import SignIn from './pages/SignIn'
//import StreetForm from './components/StreetForm'
import StreetFeed from './pages/StreetFeed'

export default function App() {
  //const [authenticated, toggleAuthenticated] = useState(false)
  //turns out you don't actually need this to work ^^
  const [user, setUser] = useState(null)

  // const handleLogOut = () => {
  //   //Reset all auth related state and clear localStorage
  //   setUser(null)
  //   toggleAuthenticated(false)
  //   localStorage.clear()
  // }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    //toggleAuthenticated(true) //not needed per lesson
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <main>
        {/* <SignIn /> */}
        <Routes>
          <Route
            path="/"
            element={
              <SignIn
                setUser={setUser}
                // toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route
            path="/streetfeed"
            element={
              <StreetFeed
                user={user}
                // authenticated={authenticated}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}
