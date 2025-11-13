import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostQuery,
  useGetCategoriesQuery,
} from '../store/apiSlice'

function PostForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')

  const { data: categories } = useGetCategoriesQuery()
  const { data: existingPost } = useGetPostQuery(Number(id), {
    skip: !isEditMode,
  })

  const [createPost, { isLoading: isCreating, error: createError }] =
    useCreatePostMutation()
  const [updatePost, { isLoading: isUpdating, error: updateError }] =
    useUpdatePostMutation()

  useEffect(() => {
    if (isEditMode && existingPost) {
      setTitle(existingPost.title)
      setContent(existingPost.content)
      setCategory(existingPost.category)
    } else if (categories && categories.length > 0) {
      // Set default category for new posts
      setCategory(categories[0])
    }
  }, [isEditMode, existingPost, categories])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !category) {
      alert('Please fill in all fields')
      return
    }

    try {
      if (isEditMode) {
        await updatePost({
          id: Number(id),
          data: { title, content, category },
        }).unwrap()
      } else {
        await createPost({ title, content, category }).unwrap()
      }
      navigate('/')
    } catch (error) {
      console.error('Failed to save post:', error)
    }
  }

  const error = createError || updateError
  const isLoading = isCreating || isUpdating

  return (
    <div className="form">
      <h2 className="form-title">
        {isEditMode ? '✏️ Edit Post' : '✨ Create New Post'}
      </h2>

      {error && (
        <div className="error-message">
          Failed to {isEditMode ? 'update' : 'create'} post. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories?.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-success"
            disabled={isLoading}
          >
            {isLoading
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
              ? '💾 Update Post'
              : '🚀 Publish Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
