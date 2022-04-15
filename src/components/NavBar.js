import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <div className="navLinkBar">
        {/* <Link className="navLink" to="/register">
          Register
        </Link> */}
        {/* <Link className="navLink">Home</Link> */}
        {/* <Link className="navLink" to="/signin">
          Sign In
        </Link> */}
        {/* <Link className="navLink">Your Streets</Link>
        <Link className="navLink">Your Comments</Link> */}
      </div>
      <h1 className="pageTitle">The NeighboUrhood</h1>
    </nav>
  )
}

export default NavBar
