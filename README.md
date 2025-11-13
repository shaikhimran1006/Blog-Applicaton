# 📝 Blog Application

A full-stack blog application with authentication, CRUD operations, and search functionality. Built with modern web technologies as an intern learning project.

## 🎯 Project Overview

This is a complete blog system where users can:
- 👀 View a list of blog posts
- 📖 View details of individual posts
- ✍️ Create new blog posts (authenticated users)
- ✏️ Edit their own posts
- 🗑️ Delete their own posts
- 🔐 Register and login to the system
- 🔍 Search and filter posts

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Router** - Client-side routing

### Data Storage
- In-memory arrays (no database required)
- Session-based authentication

## 📁 Project Structure

```
Blog App/
├── backend/
│   ├── server.js          # Express server with API routes
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend documentation
│
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   ├── store/         # Redux store & API
    │   ├── App.tsx        # Root component
    │   ├── main.tsx       # Entry point
    │   └── index.css      # Global styles
    ├── package.json       # Frontend dependencies
    └── README.md          # Frontend documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd "Blog App"
```

2. **Install Backend Dependencies:**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies:**
```bash
cd ../frontend
npm install
```

### Running the Application

You need to run both backend and frontend servers:

#### 1. Start the Backend Server

Open a terminal in the `backend` folder:

```bash
cd backend
npm run dev
```

Server will run on: `http://localhost:5000`

#### 2. Start the Frontend Development Server

Open another terminal in the `frontend` folder:

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:3000`

#### 3. Access the Application

Open your browser and go to: `http://localhost:3000`

## 👤 Default Test Account

You can login with the default account:
- **Email**: `admin@blog.com`
- **Password**: `admin123`

Or register a new account!

## 📚 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (protected)
- `GET /api/auth/me` - Get current user (protected)

### Blog Post Routes
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `GET /api/posts/search/:query` - Search posts

## 🎓 Learning Objectives

This project covers:

1. ✅ **REST API Basics** - Understanding GET, POST, PUT, DELETE methods
2. ✅ **React + Vite + TypeScript** - Modern React development setup
3. ✅ **Redux Toolkit Query** - Advanced state management and API handling
4. ✅ **Routing** - Client-side routing with React Router
5. ✅ **Form Handling** - User input and validation
6. ✅ **Authentication** - User registration, login, and protected routes
7. ✅ **CRUD Operations** - Create, Read, Update, Delete functionality
8. ✅ **Component Architecture** - Building reusable React components
9. ✅ **TypeScript Integration** - Type-safe React and Redux code

## 🎨 Features

### Implemented Features
- ✅ User authentication (register/login/logout)
- ✅ View all blog posts
- ✅ View single post details
- ✅ Create new posts (authenticated)
- ✅ Edit own posts (authenticated)
- ✅ Delete own posts (authenticated)
- ✅ Real-time search/filter functionality
- ✅ Responsive design
- ✅ Protected routes
- ✅ Auto-increment IDs
- ✅ Timestamps (createdAt/updatedAt)

### Optional Extensions (Bonus)
Ideas for further improvement:
- 📄 Use JSON file instead of in-memory storage
- 💬 Add comments to posts
- ❤️ Like/favorite posts
- 🏷️ Tags and categories
- 📊 User dashboard
- 🖼️ Image uploads
- 📱 Progressive Web App (PWA)
- 🌓 Dark mode toggle

## 🧭 Evaluation Criteria

| Criteria | Status | Description |
|----------|--------|-------------|
| **Functionality** | ✅ | App fetches, creates, edits, deletes posts properly |
| **Code Quality** | ✅ | Clean folder structure, reusable components |
| **API Usage** | ✅ | Proper RTK Query integration with TypeScript |
| **UI/UX** | ✅ | Clean, responsive layout with intuitive forms |
| **Authentication** | ✅ | Complete auth system with protected routes |
| **TypeScript** | ✅ | Full type safety across the application |

## 🔧 Development Tips

### Backend Development
- Backend runs with auto-reload using Nodemon
- All data is stored in memory (resets on server restart)
- CORS is enabled for frontend communication

### Frontend Development
- Vite provides hot module replacement (HMR)
- Redux DevTools extension recommended for debugging
- All API calls are handled via RTK Query

## 📝 Git Workflow Recommendation

Suggested commit structure:
1. ✅ Initial project setup
2. ✅ Backend API implementation
3. ✅ Frontend React + Vite setup
4. ✅ Redux store and API slice
5. ✅ Authentication components
6. ✅ Blog post components (List, Detail, Form)
7. ✅ Search and filter functionality
8. ✅ Final styling and polish

## 🐛 Troubleshooting

### Port Already in Use
If you get a port conflict error:
- Backend: Change `PORT` in `backend/server.js`
- Frontend: Change `port` in `frontend/vite.config.ts`

### Module Not Found
Make sure you ran `npm install` in both backend and frontend folders.

### API Connection Errors
Verify that:
1. Backend server is running on `http://localhost:5000`
2. Frontend is configured to use the correct API URL in `apiSlice.ts`

## 📖 Further Learning

To extend your knowledge:
- Add database integration (MongoDB, PostgreSQL)
- Implement JWT token refresh
- Add password hashing (bcrypt)
- Deploy to cloud platforms
- Add automated testing
- Implement CI/CD pipeline

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new features
- Improve the UI/UX
- Refactor code
- Add tests
- Enhance documentation

## 📄 License

This project is created for educational purposes.

---

**Happy Coding! 🚀**
