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

  const changeNavCount = () => {
    props.setNavCount(props.navCount + 1)
  }

  return (
    <div>
      <Link to="/streetfeed" onClick={changeNavCount}>
        The Feed
      </Link>
      <Link to="/" onClick={props.handleLogOut}>
        Log Out
      </Link>
      <Link to="/profile">Edit Profile</Link>
      <h2>Welcome, {props.user.firstName}!</h2>
    </div>
  )
}

export default NavBar
