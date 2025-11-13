const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@blog.com',
    password: 'admin123' // In production, this should be hashed!
  }
];

let posts = [
  {
    id: 1,
    title: 'Welcome to the Blog',
    content: 'This is your first blog post. Start creating amazing content!',
    author: 'admin',
    authorId: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Getting Started with React',
    content: 'React is a powerful JavaScript library for building user interfaces. Let\'s explore its features...',
    author: 'admin',
    authorId: 1,
    createdAt: new Date().toISOString()
  }
];

let nextUserId = 2;
let nextPostId = 3;

// Session storage (in-memory, for demo purposes only)
let sessions = {}; // { token: userId }

// Helper function to generate simple token
const generateToken = () => {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
};

// Helper function to authenticate requests
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  req.userId = sessions[token];
  req.user = users.find(u => u.id === req.userId);
  next();
};

// ============= AUTH ROUTES =============

// Register
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already taken' });
  }
  
  // Create new user
  const newUser = {
    id: nextUserId++,
    username,
    email,
    password // In production, hash this!
  };
  
  users.push(newUser);
  
  // Create session
  const token = generateToken();
  sessions[token] = newUser.id;
  
  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  // Create session
  const token = generateToken();
  sessions[token] = user.id;
  
  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
});

// Logout
app.post('/api/auth/logout', authenticate, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  delete sessions[token];
  
  res.json({ message: 'Logout successful' });
});

// Get current user
app.get('/api/auth/me', authenticate, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

// ============= POST ROUTES =============

// GET all posts
app.get('/api/posts', (req, res) => {
  // Return posts in reverse chronological order
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(sortedPosts);
});

// GET single post by ID
app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.json(post);
});

// POST create new post (protected)
app.post('/api/posts', authenticate, (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  const newPost = {
    id: nextPostId++,
    title,
    content,
    author: req.user.username,
    authorId: req.user.id,
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT update post (protected)
app.put('/api/posts/:id', authenticate, (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  // Check if user is the author
  if (posts[postIndex].authorId !== req.user.id) {
    return res.status(403).json({ error: 'You can only edit your own posts' });
  }
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  posts[postIndex] = {
    ...posts[postIndex],
    title,
    content,
    updatedAt: new Date().toISOString()
  };
  
  res.json(posts[postIndex]);
});

// DELETE post (protected)
app.delete('/api/posts/:id', authenticate, (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  // Check if user is the author
  if (posts[postIndex].authorId !== req.user.id) {
    return res.status(403).json({ error: 'You can only delete your own posts' });
  }
  
  posts.splice(postIndex, 1);
  res.json({ message: 'Post deleted successfully' });
});

// Search posts
app.get('/api/posts/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(query) || 
    post.content.toLowerCase().includes(query)
  );
  
  res.json(filteredPosts);
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
