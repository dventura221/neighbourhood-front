import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <div>
      <Link to="/streetfeed">The Feed</Link>
      <Link to="/" onClick={props.handleLogOut}>
        Log Out
      </Link>
      <Link to="/profile">Edit Profile</Link>
      <h1>Welcome, {props.user.firstName}</h1>
    </div>
  )
}

export default NavBar
