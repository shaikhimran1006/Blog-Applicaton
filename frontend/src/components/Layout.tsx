import { Outlet, Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logout } from '../store/authSlice'
import { useLogoutMutation } from '../store/apiSlice'

function Layout() {
  const dispatch = useAppDispatch()
  const { token, user } = useAppSelector((state) => state.auth)
  const [logoutMutation] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch(logout())
    }
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>📝 My Blog</h1>
            </Link>
            <nav className="nav">
              <Link to="/">Home</Link>
              {token ? (
                <>
                  <Link to="/create">Create Post</Link>
                  <div className="user-info">
                    <span className="username">👤 {user?.username}</span>
                    <button onClick={handleLogout} className="btn btn-secondary">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
