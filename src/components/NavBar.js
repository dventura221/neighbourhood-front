import { Link } from 'react-router-dom'

const NavBar = (props) => {
  let authenticatedOptions
  if (props.user) {
    authenticatedOptions = (
      <div>
        <h3>Welcome {props.user.userName}</h3>
        <Link to="/streetfeed">The Feed</Link>
        <Link to="/" onClick={props.handleLogOut}>
          Log Out
        </Link>
        {/* <Link className="navLink">Your Streets</Link> */}
        {/* <Link className="navLink">Your Comments</Link> */}
      </div>
    )
  }

  const publicOptions = <nav>{/* <Link to="/">Sign In</Link> */}</nav>

  return <div>{props.user ? authenticatedOptions : publicOptions}</div>
}

export default NavBar
