import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../store/apiSlice'
import { useAppDispatch } from '../store/hooks'
import { setCredentials } from '../store/authSlice'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [register, { isLoading, error }] = useRegisterMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    try {
      const result = await register({ username, email, password }).unwrap()
      dispatch(setCredentials({ token: result.token, user: result.user }))
      navigate('/')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="auth-container">
      <div className="form">
        <h2 className="form-title">📝 Register</h2>

        {error && (
          <div className="error-message">
            {'data' in error && typeof error.data === 'object' && error.data && 'error' in error.data
              ? String(error.data.error)
              : 'Registration failed. Please try again.'}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>

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
              placeholder="Choose a password (min 6 characters)"
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-success"
              disabled={isLoading}
              style={{ width: '100%' }}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="form-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
