import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <h1>the Neighbourhood</h1>
      <Link to="/signin">Sign In</Link>
      <Link to="/streetfeed">The Feed</Link>
      {/* <Link className="navLink">Your Streets</Link> */}
      {/* <Link className="navLink">Your Comments</Link> */}
    </nav>
  )
}

export default NavBar
