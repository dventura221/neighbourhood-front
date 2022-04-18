import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
// import NavBar from './components/NavBar'
//import RegisterForm from './components/RegisterForm'
import SignIn from './pages/SignIn'
//import StreetForm from './components/StreetForm'
import StreetFeed from './pages/StreetFeed'

export default function App() {
  return (
    <div className="App">
      <main>
        {/* <SignIn /> */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/streetfeed" element={<StreetFeed />} />
        </Routes>
      </main>
    </div>
  )
}
