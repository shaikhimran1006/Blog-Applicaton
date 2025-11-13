# 🎯 Quick Reference Card

## 📦 Installation (One-Time Setup)

```bash
# Backend
cd "d:\Blog App\backend"
npm install

# Frontend (open new terminal)
cd "d:\Blog App\frontend"
npm install
```

---

## 🚀 Starting the Application

**Terminal 1 - Backend:**
```bash
cd "d:\Blog App\backend"
npm run dev
```
✅ Should see: `Server is running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd "d:\Blog App\frontend"
npm run dev
```
✅ Should see: `Local: http://localhost:3000`

**Browser:**
```
Open: http://localhost:3000
```

---

## 👤 Default Account

```
Email:    admin@blog.com
Password: admin123
```

---

## 🛠️ Common Commands

### Backend
```bash
npm start        # Production mode
npm run dev      # Development mode (auto-reload)
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📁 Important Files

### Backend
```
backend/server.js          # Main API server
backend/package.json       # Dependencies
```

### Frontend
```
frontend/src/App.tsx       # Routes
frontend/src/main.tsx      # Entry point
frontend/src/store/        # Redux store
frontend/src/components/   # React components
frontend/src/index.css     # Styles
```

---

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/register   # Register new user
POST   /api/auth/login      # Login
POST   /api/auth/logout     # Logout (protected)
GET    /api/auth/me         # Get current user (protected)
```

### Blog Posts
```
GET    /api/posts           # Get all posts
GET    /api/posts/:id       # Get single post
POST   /api/posts           # Create post (protected)
PUT    /api/posts/:id       # Update post (protected)
DELETE /api/posts/:id       # Delete post (protected)
GET    /api/posts/search/:q # Search posts
```

---

## 🎨 URL Routes (Frontend)

```
/                # Home - List all posts
/post/:id        # View single post
/create          # Create new post (requires login)
/edit/:id        # Edit post (requires login)
/login           # Login page
/register        # Register page
```

---

## 🔧 Troubleshooting

### Port Already in Use
```javascript
// backend/server.js
const PORT = 5001;  // Change from 5000

// frontend/vite.config.ts
server: { port: 3001 }  // Change from 3000
```

### Cannot Load Posts
1. ✅ Backend running? Check terminal 1
2. ✅ See "Server is running" message?
3. ✅ Try: http://localhost:5000 in browser
4. ✅ Should see: {"message": "Blog API is running!"}

### Login Not Working
1. ✅ Using correct credentials?
2. ✅ Check browser console (F12) for errors
3. ✅ Backend server running?

---

## 🔍 Debugging Tips

### Browser DevTools (F12)
```
Console tab    → JavaScript errors
Network tab    → API requests
Application    → localStorage (token)
```

### Backend Terminal
```
Watch for error messages
Check request logs
Verify server is running
```

### Frontend Terminal
```
TypeScript errors appear here
Build errors appear here
```

---

## 📊 Project Structure at a Glance

```
Blog App/
├── backend/
│   ├── server.js          ← API code here
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    ← React components
│   │   ├── store/         ← Redux store
│   │   ├── App.tsx        ← Routes
│   │   └── main.tsx       ← Entry
│   └── package.json
│
└── Documentation files
```

---

## 💾 Data Storage

```javascript
// backend/server.js
let users = [...]    // User accounts
let posts = [...]    // Blog posts
let sessions = {...} // Active login sessions
```

⚠️ **Note**: Data resets when server restarts!

---

## 🎓 Key Technologies

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **RTK Query** - API calls
- **React Router** - Navigation

---

## ✅ Quick Test Checklist

- [ ] Both servers running
- [ ] Homepage loads
- [ ] Can see posts
- [ ] Can search posts
- [ ] Can register new user
- [ ] Can login
- [ ] Can create post
- [ ] Can edit own post
- [ ] Can delete own post
- [ ] Can logout

---

## 🚫 Common Mistakes

❌ **Forgetting to start backend**
✅ Always start backend first

❌ **Wrong port numbers**
✅ Backend: 5000, Frontend: 3000

❌ **Not in correct directory**
✅ Check you're in backend/ or frontend/

❌ **Forgot npm install**
✅ Run in both directories

❌ **Closed terminal**
✅ Keep both terminals open

---

## 📚 Documentation Files

```
README.md                # Main overview
SETUP_GUIDE.md          # Installation guide
LEARNING_GUIDE.md       # Code explanations
ARCHITECTURE.md         # System diagrams
TESTING_CHECKLIST.md    # Testing guide
PROJECT_SUMMARY.md      # Project details
QUICK_REFERENCE.md      # This file!
```

---

## 🎯 Learning Path

### Beginner
1. Start both servers
2. Test existing features
3. Read SETUP_GUIDE.md

### Intermediate
1. Read LEARNING_GUIDE.md
2. Understand the code
3. Make small changes

### Advanced
1. Read ARCHITECTURE.md
2. Add new features
3. Refactor code

---

## 💡 Next Steps

After setup:
1. ✅ Test all features
2. ✅ Read the code
3. ✅ Make modifications
4. ✅ Add new features
5. ✅ Deploy (optional)

---

## 🔗 Useful Links

### Documentation
- React: https://react.dev
- Redux: https://redux-toolkit.js.org
- Express: https://expressjs.com

### Tools
- VS Code: https://code.visualstudio.com
- Node.js: https://nodejs.org
- Postman: https://postman.com (API testing)

---

## 📞 Help Resources

### Project Files
- Check SETUP_GUIDE.md
- Read error messages
- Check browser console

### Online
- Stack Overflow
- React Discord
- GitHub Issues

---

**Keep this file handy for quick reference! 🚀**

---

## 🎉 Quick Win!

Want to see it work fast?

```bash
# Terminal 1
cd "d:\Blog App\backend"
npm install && npm run dev

# Terminal 2
cd "d:\Blog App\frontend"
npm install && npm run dev

# Browser
# → http://localhost:3000
# → Click Login
# → Use: admin@blog.com / admin123
# → Start blogging! ✨
```

---

**Created with ❤️ | Last Updated: November 2025**
