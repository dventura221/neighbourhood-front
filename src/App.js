import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'
// import NavBar from './components/NavBar'
import SignIn from './pages/SignIn'
import StreetFeed from './pages/StreetFeed'
import UpdateUser from './pages/UpdateUser'

export default function App() {
  const [user, setUser] = useState(null)

  const [allStreets, setAllStreets] = useState([])
  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<SignIn setUser={setUser} />} />
          <Route
            path="/streetfeed"
            element={
              <StreetFeed
                user={user}
                handleLogOut={handleLogOut}
                setAllStreets={setAllStreets}
                allStreets={allStreets}
              />
            }
          />
          <Route path="/profile" element={<UpdateUser user={user} />} />
        </Routes>
      </main>
    </div>
  )
}
