import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetPostsQuery, useGetCategoriesQuery } from '../store/apiSlice'

function PostList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { data: categories } = useGetCategoriesQuery()
  const { data: posts, isLoading, error } = useGetPostsQuery(
    selectedCategory === 'All' ? undefined : selectedCategory
  )

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

      <div className="filter-container">
        <div className="form-group">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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
                <div className="post-category-badge">{post.category}</div>
                <h3 className="card-title">{post.title}</h3>
                <div className="card-meta">
                  <span>✍️ {post.author}</span>
                  <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>🕒 {new Date(post.createdAt).toLocaleTimeString()}</span>
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
