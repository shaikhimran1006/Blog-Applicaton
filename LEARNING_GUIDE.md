# 🎓 Learning Resources & Code Walkthrough

This document explains the key concepts and code structure to help you understand the project.

## Table of Contents
1. [Backend Architecture](#backend-architecture)
2. [Frontend Architecture](#frontend-architecture)
3. [State Management](#state-management)
4. [Authentication Flow](#authentication-flow)
5. [API Communication](#api-communication)
6. [Key Concepts](#key-concepts)

---

## Backend Architecture

### File: `backend/server.js`

#### Express Server Setup
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
```

**What it does:**
- Creates an Express server
- Enables CORS (frontend can talk to backend)
- Parses JSON data from requests

#### In-Memory Data Storage
```javascript
let users = [/* array of user objects */];
let posts = [/* array of post objects */];
let sessions = {}; // token: userId mapping
```

**Why in-memory?**
- No database setup required
- Perfect for learning
- Data resets on server restart

#### Authentication Middleware
```javascript
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.userId = sessions[token];
  next();
};
```

**How it works:**
1. Extracts token from request header
2. Checks if token exists in sessions
3. If valid, adds userId to request
4. If invalid, returns 401 error

#### REST API Endpoints

**Authentication:**
- `POST /api/auth/register` - Creates new user
- `POST /api/auth/login` - Authenticates user
- `POST /api/auth/logout` - Removes session
- `GET /api/auth/me` - Gets current user info

**Posts:**
- `GET /api/posts` - Returns all posts
- `GET /api/posts/:id` - Returns single post
- `POST /api/posts` - Creates new post (protected)
- `PUT /api/posts/:id` - Updates post (protected)
- `DELETE /api/posts/:id` - Deletes post (protected)

---

## Frontend Architecture

### Main Files

#### `main.tsx` - Application Entry Point
```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>        // Redux store
    <BrowserRouter>               // React Router
      <App />
    </BrowserRouter>
  </Provider>
)
```

**Providers Explained:**
- `Provider`: Gives all components access to Redux store
- `BrowserRouter`: Enables client-side routing

#### `App.tsx` - Route Configuration
```typescript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<PostList />} />
    <Route path="/post/:id" element={<PostDetail />} />
    <Route path="/create" element={token ? <PostForm /> : <Navigate to="/login" />} />
    <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
  </Route>
</Routes>
```

**Route Protection:**
- If logged in (`token` exists) → allow access to `/create`
- If not logged in → redirect to `/login`
- If on login page but logged in → redirect to home

### Component Breakdown

#### 1. **Layout.tsx** - Main Layout
- Header with navigation
- Shows different links based on auth state
- Logout functionality
- Wraps all pages with `<Outlet />`

#### 2. **PostList.tsx** - Blog Posts List
- Fetches all posts using `useGetPostsQuery()`
- Search/filter functionality
- Maps over posts to display cards
- Links to individual post pages

#### 3. **PostDetail.tsx** - Single Post View
- Gets post ID from URL params
- Fetches single post using `useGetPostQuery(id)`
- Shows edit/delete buttons for post author
- Handles post deletion

#### 4. **PostForm.tsx** - Create/Edit Post
- Dual purpose: create new or edit existing
- Detects mode from URL (has ID = edit mode)
- Form validation
- Submits to API using mutations

#### 5. **Login.tsx** - Login Page
- Form with email/password
- Calls `useLoginMutation()`
- Stores token in Redux and localStorage
- Redirects on success

#### 6. **Register.tsx** - Registration Page
- Form with username, email, password
- Password confirmation validation
- Calls `useRegisterMutation()`
- Auto-login on success

---

## State Management

### Redux Store Structure

```
store/
├── store.ts       - Configures Redux store
├── apiSlice.ts    - RTK Query API definitions
├── authSlice.ts   - Authentication state
└── hooks.ts       - Typed hooks
```

### `store.ts` - Store Configuration
```typescript
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,  // API cache
    auth: authReducer,                          // Auth state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
```

### `authSlice.ts` - Auth State
```typescript
interface AuthState {
  token: string | null;
  user: User | null;
}

// Actions:
setCredentials(state, action)  // Saves token and user
logout(state)                  // Clears token and user
```

**Persistence:**
- Token stored in localStorage
- Survives page refresh
- Automatically loaded on app start

### `apiSlice.ts` - RTK Query API

**Key Concepts:**

1. **Queries** - GET requests (read data)
```typescript
getPosts: builder.query<Post[], void>({
  query: () => '/posts',
})
```

2. **Mutations** - POST/PUT/DELETE (modify data)
```typescript
createPost: builder.mutation<Post, Partial<Post>>({
  query: (post) => ({
    url: '/posts',
    method: 'POST',
    body: post,
  }),
})
```

3. **Cache Invalidation**
```typescript
invalidatesTags: ['Post']  // Refetch posts after mutation
```

**Generated Hooks:**
- `useGetPostsQuery()` - Fetch all posts
- `useGetPostQuery(id)` - Fetch single post
- `useCreatePostMutation()` - Create post
- `useUpdatePostMutation()` - Update post
- `useDeletePostMutation()` - Delete post

---

## Authentication Flow

### Registration Flow
```
1. User fills registration form
2. Click "Register"
3. Frontend → POST /api/auth/register
4. Backend creates user + generates token
5. Backend → Response with token + user data
6. Frontend saves to Redux + localStorage
7. Redirect to home page
```

### Login Flow
```
1. User enters email + password
2. Click "Login"
3. Frontend → POST /api/auth/login
4. Backend verifies credentials
5. Backend → Response with token + user data
6. Frontend saves to Redux + localStorage
7. Redirect to home page
```

### Protected Request Flow
```
1. User tries to create post
2. Frontend adds token to request header
3. Backend checks token in authenticate middleware
4. If valid → process request
5. If invalid → return 401 error
```

### Logout Flow
```
1. User clicks "Logout"
2. Frontend → POST /api/auth/logout
3. Backend removes session
4. Frontend clears Redux + localStorage
5. Redirect to home page
```

---

## API Communication

### How RTK Query Works

#### Making a Query (GET)
```typescript
const { data, isLoading, error } = useGetPostsQuery()

// RTK Query automatically:
// 1. Makes GET request to /api/posts
// 2. Caches the result
// 3. Provides loading state
// 4. Handles errors
// 5. Re-fetches when needed
```

#### Making a Mutation (POST/PUT/DELETE)
```typescript
const [createPost, { isLoading }] = useCreatePostMutation()

const handleSubmit = async () => {
  try {
    await createPost({ title, content }).unwrap()
    // Success!
  } catch (error) {
    // Handle error
  }
}
```

#### Automatic Token Handling
```typescript
prepareHeaders: (headers, { getState }) => {
  const token = (getState() as RootState).auth.token
  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }
  return headers
}
```

**This code:**
- Runs before every request
- Gets token from Redux state
- Adds it to Authorization header
- Backend receives it automatically

---

## Key Concepts

### 1. **RESTful API**
- Uses HTTP methods (GET, POST, PUT, DELETE)
- Resources accessed via URLs
- Stateless communication

### 2. **Single Page Application (SPA)**
- One HTML page
- JavaScript handles navigation
- Fast, smooth user experience

### 3. **Component-Based Architecture**
- UI broken into reusable pieces
- Each component has its own logic
- Props pass data between components

### 4. **State Management**
- Redux stores global state
- Components subscribe to needed data
- Actions modify state

### 5. **TypeScript Benefits**
```typescript
interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}
```
- Catches errors during development
- Auto-completion in IDE
- Better code documentation

### 6. **Protected Routes**
```typescript
token ? <PostForm /> : <Navigate to="/login" />
```
- Redirect unauthorized users
- Protect sensitive pages
- Better security

### 7. **CORS (Cross-Origin Resource Sharing)**
```javascript
app.use(cors())
```
- Allows frontend (port 3000) to talk to backend (port 5000)
- Security feature in browsers
- Must be explicitly enabled

---

## Common Patterns

### Loading States
```typescript
if (isLoading) return <div>Loading...</div>
if (error) return <div>Error!</div>
return <div>{data}</div>
```

### Form Handling
```typescript
const [value, setValue] = useState('')
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

### Conditional Rendering
```typescript
{user ? <LogoutButton /> : <LoginButton />}
```

### Array Mapping
```typescript
{posts.map(post => (
  <PostCard key={post.id} post={post} />
))}
```

---

## Next Steps for Learning

1. **Add a Feature**
   - Try adding a "like" button to posts
   - Add a category field to posts
   - Implement comments

2. **Modify Existing Features**
   - Change the post card styling
   - Add sorting options (newest, oldest)
   - Add post preview limit

3. **Understand the Flow**
   - Put console.logs in components
   - Watch data flow from API to UI
   - Inspect Redux DevTools

4. **Experiment**
   - Break something intentionally
   - See what error messages tell you
   - Fix it yourself

---

**Remember: The best way to learn is by doing! 🚀**
