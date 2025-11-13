import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../store/apiSlice'
import { useAppDispatch } from '../store/hooks'
import { setCredentials } from '../store/authSlice'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials({ token: result.token, user: result.user }))
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="auth-container">
      <div className="form">
        <h2 className="form-title">🔐 Login</h2>

        {error && (
          <div className="error-message">
            {'data' in error && typeof error.data === 'object' && error.data && 'error' in error.data
              ? String(error.data.error)
              : 'Login failed. Please check your credentials.'}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
              style={{ width: '100%' }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="form-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>

        <div className="form-footer" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <strong>Demo credentials:</strong><br />
          Email: admin@blog.com<br />
          Password: admin123
        </div>
      </div>
    </div>
  )
}

export default Login
