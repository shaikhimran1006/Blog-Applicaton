# 🚀 Quick Start Guide

Follow these steps to get your Blog Application up and running!

## Step 1: Install Backend Dependencies

Open a terminal/PowerShell window and navigate to the backend folder:

```powershell
cd "d:\Blog App\backend"
npm install
```

Wait for the installation to complete. You should see packages being installed.

## Step 2: Install Frontend Dependencies

Open another terminal/PowerShell window and navigate to the frontend folder:

```powershell
cd "d:\Blog App\frontend"
npm install
```

This will install React, TypeScript, Vite, Redux Toolkit, and other dependencies.

## Step 3: Start the Backend Server

In the backend terminal, run:

```powershell
npm run dev
```

You should see:
```
Server is running on http://localhost:5000
```

**Keep this terminal running!**

## Step 4: Start the Frontend Server

In the frontend terminal, run:

```powershell
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Keep this terminal running too!**

## Step 5: Open the Application

1. Open your web browser
2. Go to: `http://localhost:3000`
3. You should see the Blog Application homepage!

## Step 6: Test the Application

### Option A: Use Default Account
1. Click "Login" in the navigation
2. Use these credentials:
   - **Email**: `admin@blog.com`
   - **Password**: `admin123`
3. Click "Login"

### Option B: Register New Account
1. Click "Register" in the navigation
2. Fill in the form:
   - Username: (your choice)
   - Email: (your choice)
   - Password: (at least 6 characters)
   - Confirm Password: (same as password)
3. Click "Create Account"

## Step 7: Try Creating a Post

Once logged in:
1. Click "+ New Post" button
2. Fill in the title and content
3. Click "🚀 Publish Post"
4. Your post will appear on the home page!

## Common Issues & Solutions

### Issue: "Port 5000 is already in use"
**Solution**: Another application is using port 5000. 
- Stop other applications using that port, OR
- Edit `backend/server.js` and change `const PORT = 5000;` to another port like `5001`

### Issue: "Port 3000 is already in use"
**Solution**: Another application is using port 3000.
- Stop other applications using that port, OR
- When Vite asks if you want to use another port, type `y` and press Enter

### Issue: "Cannot GET /api/posts"
**Solution**: Backend server is not running.
- Make sure you started the backend server with `npm run dev` in the backend folder
- Check that it says "Server is running on http://localhost:5000"

### Issue: "Failed to load posts"
**Solution**: 
- Make sure both servers are running
- Check that backend is on port 5000 and frontend is on port 3000
- Check browser console (F12) for error messages

### Issue: Module not found errors
**Solution**: Dependencies not installed.
- Run `npm install` in both backend and frontend folders
- Make sure you're in the correct folder when running the command

## File Structure Overview

```
Blog App/
├── backend/               # Backend API
│   ├── node_modules/     # Backend dependencies (created after npm install)
│   ├── server.js         # Main server file
│   ├── package.json      # Backend configuration
│   └── README.md         # Backend docs
│
└── frontend/             # Frontend React app
    ├── node_modules/     # Frontend dependencies (created after npm install)
    ├── src/              # Source code
    │   ├── components/   # React components
    │   ├── store/        # Redux store
    │   ├── App.tsx       # Main app component
    │   ├── main.tsx      # Entry point
    │   └── index.css     # Styles
    ├── index.html        # HTML template
    ├── package.json      # Frontend configuration
    ├── vite.config.ts    # Vite configuration
    └── tsconfig.json     # TypeScript configuration
```

## What You Can Do

✅ **View Posts** - See all blog posts on the homepage
✅ **Search Posts** - Use the search box to filter posts
✅ **View Post Details** - Click any post to read the full content
✅ **Register** - Create a new user account
✅ **Login** - Sign in to your account
✅ **Create Posts** - Write and publish new blog posts (requires login)
✅ **Edit Posts** - Modify your own posts (requires login)
✅ **Delete Posts** - Remove your own posts (requires login)
✅ **Logout** - Sign out of your account

## Development Workflow

### Making Changes to Backend
1. Edit files in `backend/` folder
2. Server auto-restarts thanks to Nodemon
3. Test your changes immediately

### Making Changes to Frontend
1. Edit files in `frontend/src/` folder
2. Browser auto-refreshes thanks to Vite HMR
3. See changes instantly

## Stopping the Servers

When you're done:
1. Go to each terminal window
2. Press `Ctrl + C`
3. Type `Y` if asked to terminate

## Next Steps

Now that everything is working:

1. **Explore the Code**
   - Check out `backend/server.js` to see the API
   - Look at `frontend/src/components/` to understand React components
   - Review `frontend/src/store/apiSlice.ts` to see RTK Query in action

2. **Try Making Changes**
   - Add a new field to posts (like tags or category)
   - Change the styling in `index.css`
   - Add a new feature (like post likes or comments)

3. **Learn More**
   - React documentation: https://react.dev
   - Redux Toolkit: https://redux-toolkit.js.org
   - TypeScript: https://www.typescriptlang.org
   - Express.js: https://expressjs.com

## Getting Help

If you're stuck:
1. Check the browser console (Press F12 → Console tab)
2. Check the terminal for error messages
3. Read the error messages carefully
4. Look for typos in your code
5. Make sure both servers are running

---

**You're all set! Happy coding! 🎉**
