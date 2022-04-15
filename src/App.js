import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
//import RegisterForm from './components/RegisterForm'
import SignIn from './pages/SignIn'
import StreetForm from './components/StreetForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main>
        <SignIn />
        <StreetForm />
        {/* <Routes>
          <Route path="/signin" element={<SignInPage />} />
        </Routes> */}
      </main>
    </div>
  )
}

export default App
