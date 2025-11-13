import { useParams, useNavigate, Link } from 'react-router-dom'
import { useGetPostQuery, useDeletePostMutation } from '../store/apiSlice'
import { useAppSelector } from '../store/hooks'

function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  
  const { data: post, isLoading, error } = useGetPostQuery(Number(id))
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(Number(id)).unwrap()
        navigate('/')
      } catch (error) {
        console.error('Failed to delete post:', error)
        alert('Failed to delete post. Please try again.')
      }
    }
  }

  if (isLoading) return <div className="loading">Loading post...</div>

  if (error || !post) {
    return (
      <div className="error-message">
        Post not found or failed to load.
      </div>
    )
  }

  const isAuthor = user && user.id === post.authorId

  return (
    <div className="post-detail">
      <article className="card">
        <div className="post-header">
          <div className="post-category-badge">{post.category}</div>
          <h1 className="post-title">{post.title}</h1>
          <div className="card-meta">
            <span>✍️ {post.author}</span>
            <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
            <span>🕒 {new Date(post.createdAt).toLocaleTimeString()}</span>
            {post.updatedAt && (
              <span>🔄 Updated {new Date(post.updatedAt).toLocaleDateString()} at {new Date(post.updatedAt).toLocaleTimeString()}</span>
            )}
          </div>
        </div>

        <div className="card-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1rem' }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="post-actions">
          <Link to="/" className="btn btn-secondary">
            ← Back to Posts
          </Link>
          {isAuthor && (
            <>
              <Link to={`/edit/${post.id}`} className="btn btn-primary">
                ✏️ Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn btn-danger"
              >
                {isDeleting ? 'Deleting...' : '🗑️ Delete'}
              </button>
            </>
          )}
        </div>
      </article>
    </div>
  )
}

export default PostDetail
