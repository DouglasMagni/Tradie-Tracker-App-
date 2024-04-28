import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router-dom'

const Login = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect()
  }

  const handleLogout = () => {
    logout()
  }
  return (
    <>
      <div>
        {/* Your login page UI components */}
        <h1>Login Page</h1>
        {/* Add your login form, buttons, etc. */}
      </div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <Outlet />
      <div></div>
    </>
  )
}

export default Login
