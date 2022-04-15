import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import RegisterForm from './components/RegisterForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main>
        <RegisterForm />
        {/* <Routes>
          <Route path="/register" element={<RegisterForm />} />
        </Routes> */}
      </main>
    </div>
  )
}

export default App
