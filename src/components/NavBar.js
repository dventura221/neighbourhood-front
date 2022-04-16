import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <div className="navLinkBar">
        <Link className="navLink" to="/streetfeed">
          The Feed
        </Link>
        {/* <Link className="navLink">Your Streets</Link> */}
        {/* <Link className="navLink">Your Comments</Link> */}
        <Link className="navLink" to="/signin">
          Sign In
        </Link>
        <Link className="navLink" to="">
          Log Out
        </Link>
      </div>
      <h1 className="pageTitle">The NeighboUrhood</h1>
    </nav>
  )
}

export default NavBar
