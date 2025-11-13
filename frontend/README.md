# Blog Application - Frontend

A modern blog application built with React, TypeScript, Vite, and Redux Toolkit Query.

## Features

- 📝 View all blog posts with search functionality
- 👁️ View individual post details
- ✨ Create new blog posts (authenticated users)
- ✏️ Edit your own posts
- 🗑️ Delete your own posts
- 🔐 User authentication (Login/Register)
- 🔍 Real-time search filtering

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend server is running on `http://localhost:5000`

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/        # React components
│   ├── Layout.tsx    # Main layout with header/nav
│   ├── PostList.tsx  # Blog posts list view
│   ├── PostDetail.tsx # Single post view
│   ├── PostForm.tsx  # Create/edit post form
│   ├── Login.tsx     # Login page
│   └── Register.tsx  # Registration page
├── store/            # Redux store configuration
│   ├── store.ts      # Store setup
│   ├── apiSlice.ts   # RTK Query API endpoints
│   ├── authSlice.ts  # Authentication state
│   └── hooks.ts      # Typed Redux hooks
├── App.tsx           # Root component with routes
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Features Breakdown

### Authentication
- Users can register with username, email, and password
- Login with email and password
- Protected routes for creating/editing posts
- Automatic token management via localStorage

### Blog Posts
- View all posts in a clean card layout
- Search posts by title or content
- Click any post to view full details
- Create new posts (requires login)
- Edit/delete your own posts

### Responsive Design
- Mobile-friendly interface
- Clean and modern UI
- Intuitive navigation

## Default Test Account

- **Email**: admin@blog.com
- **Password**: admin123

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`:

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get single post
- `POST /posts` - Create post (protected)
- `PUT /posts/:id` - Update post (protected)
- `DELETE /posts/:id` - Delete post (protected)

## Learning Objectives Covered

✅ React + Vite + TypeScript setup
✅ Redux Toolkit Query for API handling
✅ Component-based architecture
✅ Client-side routing with React Router
✅ Form handling and validation
✅ Authentication state management
✅ Protected routes
✅ Type-safe Redux with TypeScript
