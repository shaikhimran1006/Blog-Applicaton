# ✅ Project Checklist & Testing Guide

Use this checklist to verify that everything is working correctly!

## 📦 Installation Checklist

### Backend Setup
- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Wait for installation to complete
- [ ] Check that `node_modules` folder was created
- [ ] No error messages during installation

### Frontend Setup
- [ ] Navigate to `frontend` folder
- [ ] Run `npm install`
- [ ] Wait for installation to complete
- [ ] Check that `node_modules` folder was created
- [ ] No error messages during installation

---

## 🚀 Server Startup Checklist

### Backend Server
- [ ] Open terminal in `backend` folder
- [ ] Run `npm run dev`
- [ ] See message: "Server is running on http://localhost:5000"
- [ ] No error messages
- [ ] Terminal stays open (server running)

### Frontend Server
- [ ] Open another terminal in `frontend` folder
- [ ] Run `npm run dev`
- [ ] See message with "http://localhost:3000"
- [ ] No error messages
- [ ] Terminal stays open (server running)

### Browser Test
- [ ] Open browser
- [ ] Go to `http://localhost:3000`
- [ ] Page loads successfully
- [ ] See "My Blog" header
- [ ] See navigation menu
- [ ] See blog posts

---

## 🧪 Functionality Testing

### 1. View Posts (Public - No Login Required)

#### Test: Homepage
- [ ] Navigate to home page
- [ ] See list of posts
- [ ] Each post shows:
  - [ ] Title
  - [ ] Author name
  - [ ] Creation date
  - [ ] Content preview
- [ ] Posts are in reverse chronological order (newest first)

#### Test: Search Functionality
- [ ] See search box at top of post list
- [ ] Type "Welcome" in search box
- [ ] Posts filter in real-time
- [ ] Only matching posts shown
- [ ] Clear search - all posts return

#### Test: View Single Post
- [ ] Click on any post card
- [ ] Navigate to post detail page
- [ ] See full post content
- [ ] See author and date
- [ ] See "Back to Posts" button
- [ ] Click back button - return to list

---

### 2. User Registration

#### Test: Access Registration Page
- [ ] Click "Register" in navigation
- [ ] Registration form appears
- [ ] See fields:
  - [ ] Username
  - [ ] Email
  - [ ] Password
  - [ ] Confirm Password
- [ ] See "Create Account" button
- [ ] See "Already have an account? Login here" link

#### Test: Form Validation
- [ ] Try to submit empty form
- [ ] Browser prevents submission (required fields)
- [ ] Enter mismatched passwords
- [ ] Click submit
- [ ] See error message about password mismatch

#### Test: Successful Registration
- [ ] Fill in valid information:
  - Username: `testuser`
  - Email: `test@example.com`
  - Password: `test123`
  - Confirm Password: `test123`
- [ ] Click "Create Account"
- [ ] Registration succeeds
- [ ] Automatically logged in
- [ ] Redirected to home page
- [ ] See username in navigation
- [ ] See "Logout" button
- [ ] See "Create Post" link

#### Test: Duplicate Email
- [ ] Try to register with same email again
- [ ] See error message: "Email already registered"

---

### 3. User Login

#### Test: Access Login Page
- [ ] If logged in, logout first
- [ ] Click "Login" in navigation
- [ ] Login form appears
- [ ] See fields:
  - [ ] Email
  - [ ] Password
- [ ] See "Login" button
- [ ] See "Don't have an account? Register here" link
- [ ] See demo credentials displayed

#### Test: Invalid Login
- [ ] Enter wrong email: `wrong@email.com`
- [ ] Enter any password
- [ ] Click "Login"
- [ ] See error message: "Invalid email or password"

#### Test: Successful Login (Default Account)
- [ ] Enter email: `admin@blog.com`
- [ ] Enter password: `admin123`
- [ ] Click "Login"
- [ ] Login succeeds
- [ ] Redirected to home page
- [ ] See "admin" in navigation
- [ ] See "Logout" button
- [ ] Navigation changes (Login/Register → Create Post/Logout)

---

### 4. Create Blog Post (Requires Login)

#### Test: Access Protection
- [ ] Logout if logged in
- [ ] Try to navigate to `/create`
- [ ] Automatically redirected to login page

#### Test: Access Form (Logged In)
- [ ] Login first
- [ ] Click "Create Post" in navigation
- [ ] Form appears with:
  - [ ] Title input field
  - [ ] Content textarea
  - [ ] Cancel button
  - [ ] Publish Post button

#### Test: Form Validation
- [ ] Leave title empty
- [ ] Enter content
- [ ] Try to submit
- [ ] Browser prevents submission (required)

#### Test: Create Post
- [ ] Enter title: "My First Post"
- [ ] Enter content: "This is the content of my first blog post!"
- [ ] Click "🚀 Publish Post"
- [ ] Redirected to home page
- [ ] New post appears at top of list
- [ ] Post shows:
  - [ ] Correct title
  - [ ] Correct content preview
  - [ ] Your username as author
  - [ ] Current date

#### Test: View Created Post
- [ ] Click on your newly created post
- [ ] See full post details
- [ ] See "Edit" button (you're the author)
- [ ] See "Delete" button (you're the author)

---

### 5. Edit Blog Post (Your Own Posts Only)

#### Test: Access Edit Form
- [ ] View one of your posts
- [ ] Click "✏️ Edit" button
- [ ] Edit form appears
- [ ] Title field pre-filled
- [ ] Content field pre-filled
- [ ] URL shows `/edit/:id`

#### Test: Make Changes
- [ ] Modify the title: "My First Post - Updated"
- [ ] Modify the content: Add more text
- [ ] Click "💾 Update Post"
- [ ] Redirected to home page
- [ ] Post shows updated title
- [ ] Click post to view details
- [ ] See updated content
- [ ] See "Updated [date]" indicator

#### Test: Authorization
- [ ] Create second user account
- [ ] Login as new user
- [ ] Try to view first user's post
- [ ] Should NOT see Edit/Delete buttons
- [ ] (Only author can edit/delete)

---

### 6. Delete Blog Post (Your Own Posts Only)

#### Test: Delete Post
- [ ] Login as post author
- [ ] View your post
- [ ] Click "🗑️ Delete" button
- [ ] See confirmation dialog: "Are you sure?"
- [ ] Click "Cancel" - nothing happens
- [ ] Click "🗑️ Delete" again
- [ ] Click "OK" in confirmation
- [ ] Redirected to home page
- [ ] Post no longer in list

---

### 7. Logout

#### Test: Logout Functionality
- [ ] Click "Logout" button in navigation
- [ ] User logged out
- [ ] Navigation changes (Create Post/Logout → Login/Register)
- [ ] Try to navigate to `/create`
- [ ] Redirected to login page
- [ ] Refresh page
- [ ] Still logged out (session cleared)

---

## 🔍 Advanced Testing

### Test: Token Persistence
- [ ] Login to account
- [ ] Create a post
- [ ] Close browser completely
- [ ] Open browser again
- [ ] Navigate to `http://localhost:3000`
- [ ] Still logged in (token in localStorage)
- [ ] Username still shows in nav

### Test: Multiple Posts
- [ ] Create 5+ posts with different content
- [ ] All appear on home page
- [ ] Newest post is at top
- [ ] Search works with all posts
- [ ] Each post has unique ID in URL

### Test: Search Edge Cases
- [ ] Search for text that doesn't exist
- [ ] See "No posts found" message
- [ ] Search with special characters
- [ ] Search works correctly

### Test: Navigation Flow
- [ ] From home → click post → see detail
- [ ] Click back button → return to home
- [ ] From home → click create → see form
- [ ] Click cancel → return to previous page
- [ ] Click logo → always go to home

### Test: Form Edge Cases
- [ ] Very long title (100+ characters)
- [ ] Very long content (1000+ characters)
- [ ] Special characters in title/content
- [ ] Emojis in content
- [ ] All should work correctly

---

## 🐛 Error Scenarios to Test

### Backend Not Running
- [ ] Stop backend server
- [ ] Try to load homepage
- [ ] See error message "Failed to load posts"
- [ ] Start backend again
- [ ] Refresh page - should work

### Frontend Not Running
- [ ] Stop frontend server
- [ ] Try to access `http://localhost:3000`
- [ ] Cannot connect
- [ ] Start frontend again
- [ ] Can access again

### Invalid Token
- [ ] Login successfully
- [ ] Open browser DevTools (F12)
- [ ] Go to Console tab
- [ ] Type: `localStorage.setItem('token', 'invalid')`
- [ ] Try to create a post
- [ ] Should see Unauthorized error
- [ ] Logout and login again to fix

---

## 📊 Performance Checks

### Loading States
- [ ] When loading posts, see "Loading posts..."
- [ ] When loading single post, see "Loading post..."
- [ ] Loading states appear briefly before content

### Cache Testing (RTK Query)
- [ ] Visit home page
- [ ] Open Network tab in DevTools
- [ ] See GET request to `/api/posts`
- [ ] Click on a post, then back
- [ ] Navigate to home again
- [ ] NO new request (using cache)
- [ ] Posts appear instantly

### Responsive Design
- [ ] Resize browser window to mobile size
- [ ] Layout adapts to smaller screen
- [ ] Navigation still works
- [ ] Forms still usable
- [ ] All features accessible

---

## ✅ Final Verification

### Code Quality
- [ ] No console errors in browser
- [ ] No server errors in terminal
- [ ] TypeScript compiles without errors
- [ ] All components render correctly

### User Experience
- [ ] App is easy to navigate
- [ ] Buttons are clearly labeled
- [ ] Forms provide feedback
- [ ] Error messages are helpful
- [ ] Loading states are clear

### Security
- [ ] Cannot create posts without login
- [ ] Cannot edit other users' posts
- [ ] Cannot delete other users' posts
- [ ] Token required for protected routes
- [ ] Logout clears authentication

---

## 🎯 Learning Objectives Achieved

By completing this project, you've learned:

- [x] **REST API** - Created endpoints for CRUD operations
- [x] **Express Server** - Set up Node.js backend
- [x] **React** - Built component-based UI
- [x] **TypeScript** - Added type safety
- [x] **Vite** - Used modern build tool
- [x] **Redux Toolkit** - Managed global state
- [x] **RTK Query** - Handled API calls and caching
- [x] **React Router** - Implemented client-side routing
- [x] **Authentication** - Built login/register system
- [x] **Protected Routes** - Secured authenticated pages
- [x] **Form Handling** - Validated user input
- [x] **CRUD Operations** - Create, Read, Update, Delete
- [x] **Component Architecture** - Organized reusable components
- [x] **State Management** - Used Redux for auth and data
- [x] **API Integration** - Connected frontend to backend

---

## 🏆 Bonus Challenges

If you want to learn more, try implementing:

- [ ] **Pagination** - Load 10 posts at a time
- [ ] **Sorting** - Sort by date, title, author
- [ ] **Categories** - Add categories to posts
- [ ] **Tags** - Add tags to posts
- [ ] **Comments** - Allow comments on posts
- [ ] **Likes** - Add like/unlike functionality
- [ ] **User Profiles** - View user's posts
- [ ] **Edit Profile** - Update username, email
- [ ] **Password Change** - Change password
- [ ] **Forgot Password** - Reset password flow
- [ ] **Email Verification** - Verify email on signup
- [ ] **Rich Text Editor** - Format post content
- [ ] **Image Upload** - Add images to posts
- [ ] **Dark Mode** - Toggle theme
- [ ] **Localization** - Multi-language support

---

**Congratulations! If all tests pass, you've successfully built a full-stack blog application! 🎉**
