import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetPostsQuery } from '../store/apiSlice'

function PostList() {
  const { data: posts, isLoading, error } = useGetPostsQuery()
  const [searchQuery, setSearchQuery] = useState('')

  if (isLoading) return <div className="loading">Loading posts...</div>

  if (error) {
    return (
      <div className="error-message">
        Failed to load posts. Please try again later.
      </div>
    )
  }

  // Filter posts based on search query
  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">All Blog Posts</h2>
        <Link to="/create" className="btn btn-primary">
          + New Post
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredPosts && filteredPosts.length > 0 ? (
        <div className="post-list">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="post-card-link"
            >
              <article className="card">
                <h3 className="card-title">{post.title}</h3>
                <div className="card-meta">
                  <span>✍️ {post.author}</span>
                  <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="post-excerpt">{post.content}</p>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No posts found</h3>
          <p>
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Be the first to create a post!'}
          </p>
        </div>
      )}
    </div>
  )
}

export default PostList
