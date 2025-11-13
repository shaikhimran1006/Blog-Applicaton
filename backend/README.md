# Blog API Backend

A simple REST API for a blog application built with Express.js.

## Features

- User authentication (register, login, logout)
- CRUD operations for blog posts
- In-memory data storage
- Protected routes for authenticated users
- Search functionality

## Installation

```bash
npm install
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (protected)
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `GET /api/posts/search/:query` - Search posts

## Default User
- Email: admin@blog.com
- Password: admin123
