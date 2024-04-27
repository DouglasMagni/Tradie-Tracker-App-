import { Link } from 'react-router-dom'
import logo from '/images/logo.svg'
import bricksLogo from '/images/bricks.svg'
import plus from '/images/plus.svg'
import notify from '/images/notify.svg'
import complete from '/images/completeJ.svg'
import profile from '/images/profile.svg'
import { useAuth0 } from '@auth0/auth0-react'

function ManagerNavbar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect()
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="nav-container">
      <div className="manager-bg-color">
        <div className="logo-container">
          <Link className="logo" to={`/`}>
            <img className="crane-logo" alt="logo" src={logo}></img>
            <img className="bricks-logo" alt="logo" src={bricksLogo}></img>
          </Link>
          <Link className="h1-nav-link" to={`/jobs/manager`}>
            <h1 className="h1-nav">Tradie Tracker</h1>
          </Link>
        </div>
        <div className="icon-container">
          <Link to={`/manager/add`}>
            <img className="nav-icon" alt="plus-icon" src={plus}></img>
          </Link>
          <Link to={`/notifications`}>
            <img className="nav-icon" alt="notify-icon" src={notify}></img>
          </Link>
          <Link to={`/jobs/manager/complete`}>
            <img className="nav-icon" alt="complete-icon" src={complete}></img>
          </Link>
          <Link to={`/jobs/manager/:id/profile`}>
            <img className="nav-icon" alt="profile-icon" src={profile}></img>
          </Link>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManagerNavbar
