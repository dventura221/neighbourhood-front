import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Sign In</Link>
        <Link to="/streetfeed">The Feed</Link>
        {/* <Link className="navLink">Your Streets</Link> */}
        {/* <Link className="navLink">Your Comments</Link> */}
        <Link to="">Log Out</Link>
      </div>
    </nav>
  )
}

export default NavBar
