import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import PostForm from './components/PostForm'
import Login from './components/Login'
import Register from './components/Register'
import { useAppSelector } from './store/hooks'

function App() {
  const token = useAppSelector((state) => state.auth.token)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route 
          path="/create" 
          element={token ? <PostForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/edit/:id" 
          element={token ? <PostForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={!token ? <Login /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!token ? <Register /> : <Navigate to="/" />} 
        />
      </Route>
    </Routes>
  )
}

export default App
