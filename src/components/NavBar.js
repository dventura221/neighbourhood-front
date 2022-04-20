import { Link } from 'react-router-dom'

const NavBar = (props) => {
  // let authenticatedOptions
  // if (props.user) {
  //   authenticatedOptions = (
  //       {/* <Link className="navLink">Your Streets</Link> */}
  //       {/* <Link className="navLink">Your Comments</Link> */}
  //   )
  // }

  // const publicOptions = {/* <Link to="/">Sign In</Link> */}

  return (
    <div>
      <Link to="/streetfeed">The Feed</Link>
      <Link to="/" onClick={props.handleLogOut}>
        Log Out
      </Link>
      <Link to="/profile">Edit Profile</Link>
      <h2>welcome @{props.user.userName}!</h2>
    </div>
  )
}

export default NavBar
