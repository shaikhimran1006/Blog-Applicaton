# 🏷️ Category Feature Guide

## Overview

The blog application now includes a comprehensive category system that allows users to:
- Select a category when creating/editing posts
- Filter posts by category
- Search within specific categories
- View category badges on posts

---

## Available Categories

The following categories are available:

1. **Technology** - Tech news, programming, software, gadgets
2. **Health & Medical** - Healthcare, fitness, medical advice
3. **Business** - Business news, entrepreneurship, finance
4. **Lifestyle** - Personal development, fashion, home
5. **Education** - Learning, tutorials, academic topics
6. **Entertainment** - Movies, music, TV, gaming
7. **Sports** - Sports news, fitness, athletics
8. **Science** - Scientific discoveries, research
9. **Travel** - Travel guides, destinations, tips
10. **Food & Cooking** - Recipes, restaurants, culinary
11. **Other** - Everything else

---

## Features

### 1. Category Selection During Post Creation

**When creating a new post:**
- Category dropdown appears between Title and Content fields
- Must select a category (required field)
- Default: First category in the list (Technology)

**When editing a post:**
- Current category is pre-selected
- Can change category during edit

### 2. Category Filter on Home Page

**Filter Dropdown:**
- Located at the top of the post list
- Shows "All Categories" by default
- Displays all available categories
- Updates post list in real-time when changed

**How it works:**
- Select "All Categories" to see all posts
- Select specific category to see only posts in that category
- Combines with search functionality

### 3. Category Badges

**Visual Display:**
- Colorful badge showing post category
- Appears on post cards in the list view
- Appears at the top of post detail view
- Gradient purple design
- Uppercase text for emphasis

### 4. Search with Categories

**Combined Search:**
- Search text + category filter work together
- First filter by category, then by search term
- Or search all categories at once

---

## API Changes

### New Endpoints

#### Get All Categories
```
GET /api/categories
```

**Response:**
```json
[
  "Technology",
  "Health & Medical",
  "Business",
  "Lifestyle",
  "Education",
  "Entertainment",
  "Sports",
  "Science",
  "Travel",
  "Food & Cooking",
  "Other"
]
```

#### Get Posts by Category
```
GET /api/posts?category=Technology
```

**Response:** Array of posts in that category

#### Search with Category Filter
```
GET /api/posts/search/react?category=Technology
```

**Response:** Posts matching search term within category

### Updated Endpoints

#### Create Post (Now Requires Category)
```
POST /api/posts
Authorization: Bearer {token}

Body:
{
  "title": "Post Title",
  "content": "Post content...",
  "category": "Technology"
}
```

#### Update Post (Category Optional)
```
PUT /api/posts/:id
Authorization: Bearer {token}

Body:
{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "Business"  // optional
}
```

---

## Frontend Changes

### Updated Components

#### 1. PostForm.tsx
**New Features:**
- Category dropdown field
- Fetches categories from API
- Validates category selection
- Pre-fills category when editing

**New State:**
```typescript
const [category, setCategory] = useState('')
const { data: categories } = useGetCategoriesQuery()
```

#### 2. PostList.tsx
**New Features:**
- Category filter dropdown
- Filters posts by selected category
- Shows category badge on each post card

**New State:**
```typescript
const [selectedCategory, setSelectedCategory] = useState<string>('All')
const { data: categories } = useGetCategoriesQuery()
```

#### 3. PostDetail.tsx
**New Features:**
- Displays category badge at top of post

### Updated Redux Store

#### apiSlice.ts
**New Interface:**
```typescript
export interface Post {
  id: number
  title: string
  content: string
  category: string        // NEW!
  author: string
  authorId: number
  createdAt: string
  updatedAt?: string
}
```

**New Query:**
```typescript
getCategories: builder.query<string[], void>({
  query: () => '/categories',
})
```

**Updated Queries:**
```typescript
// Now accepts category parameter
getPosts: builder.query<Post[], string | void>({
  query: (category) => 
    category ? `/posts?category=${category}` : '/posts',
  providesTags: ['Post'],
})

// Now accepts category in search
searchPosts: builder.query<Post[], { query: string; category?: string }>({
  query: ({ query, category }) => 
    category 
      ? `/posts/search/${query}?category=${category}` 
      : `/posts/search/${query}`,
})
```

---

## CSS Styling

### New Styles

**Category Badge:**
```css
.post-category-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
}
```

**Category Select:**
```css
.category-select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  min-width: 200px;
  margin-bottom: 1rem;
}
```

**Filter Container:**
```css
.filter-container {
  margin-bottom: 2rem;
}
```

---

## User Guide

### Creating a Post with Category

1. **Login** to your account
2. Click **"+ New Post"** button
3. **Fill in the form:**
   - Title: Enter your post title
   - **Category: Select appropriate category**
   - Content: Write your post content
4. Click **"🚀 Publish Post"**

### Filtering Posts by Category

1. Go to **homepage**
2. Look for **"Filter by Category"** dropdown at top
3. **Select a category** from the dropdown
4. Posts automatically filter to show only that category
5. Select **"All Categories"** to see all posts again

### Searching Within Categories

**Option 1: Filter First, Then Search**
1. Select a category from dropdown
2. Type search term in search box
3. Results show matching posts in that category only

**Option 2: Search All, Then Filter**
1. Type search term first
2. Then select category to narrow results

### Editing Post Category

1. **Open** your post
2. Click **"✏️ Edit"** button
3. **Change category** in dropdown
4. Click **"💾 Update Post"**

---

## Backend Implementation

### Data Structure

**Sample Post Object:**
```javascript
{
  id: 1,
  title: 'Getting Started with React',
  content: 'React is a powerful...',
  category: 'Technology',      // NEW!
  author: 'admin',
  authorId: 1,
  createdAt: '2025-11-13T...',
  updatedAt: '2025-11-13T...'
}
```

### Category Array

```javascript
const categories = [
  'Technology',
  'Health & Medical',
  'Business',
  'Lifestyle',
  'Education',
  'Entertainment',
  'Sports',
  'Science',
  'Travel',
  'Food & Cooking',
  'Other'
];
```

### Validation

**Create Post:**
```javascript
if (!category || !categories.includes(category)) {
  return res.status(400).json({ 
    error: 'Valid category is required' 
  });
}
```

**Update Post:**
```javascript
if (category && !categories.includes(category)) {
  return res.status(400).json({ 
    error: 'Invalid category' 
  });
}
```

---

## Testing Guide

### Test Category Selection

- [ ] Create new post - category dropdown appears
- [ ] All categories visible in dropdown
- [ ] Cannot submit without selecting category
- [ ] Selected category saves with post
- [ ] Edit post - current category pre-selected
- [ ] Can change category during edit

### Test Category Filter

- [ ] Filter dropdown shows on homepage
- [ ] "All Categories" shows all posts
- [ ] Selecting category filters posts correctly
- [ ] No posts message shows when category empty
- [ ] Filter persists when navigating back

### Test Category Display

- [ ] Category badge shows on post cards
- [ ] Category badge shows on post detail
- [ ] Badge styling correct (purple gradient)
- [ ] Badge readable on all backgrounds

### Test Combined Search

- [ ] Filter by category, then search
- [ ] Search, then filter by category
- [ ] Results accurate for both filters
- [ ] Clear filters work independently

---

## Troubleshooting

### Issue: Category dropdown not showing
**Solution:** 
- Backend server must be running
- Check browser console for errors
- Verify `/api/categories` endpoint works

### Issue: "Valid category is required" error
**Solution:**
- Make sure you selected a category
- Category must be from the approved list
- Check backend categories array matches frontend

### Issue: Category filter not working
**Solution:**
- Check network tab for API calls
- Verify query parameter format
- Make sure posts have categories assigned

### Issue: Old posts showing no category
**Solution:**
- Old posts may not have categories
- Can edit them to add categories
- Or update default posts in server.js

---

## Future Enhancements

Possible improvements:

1. **Category Icons** - Add icons for each category
2. **Category Colors** - Different colors per category
3. **Popular Categories** - Show post count per category
4. **Custom Categories** - Allow users to create categories
5. **Multiple Categories** - Allow posts to have multiple categories
6. **Category Pages** - Dedicated page for each category
7. **Category Hierarchy** - Subcategories and parent categories
8. **Category Suggestions** - AI-suggested categories based on content

---

## Migration Notes

### Existing Data

**Default Posts:**
- Updated with categories in `server.js`
- Post 1: "Other"
- Post 2: "Technology"

**New Posts:**
- Must include category
- Validation enforces this

**Editing Old Posts:**
- Can add category during edit
- Category becomes required

---

## Summary

The category feature adds:
- ✅ 11 predefined categories
- ✅ Required category selection on create
- ✅ Optional category update on edit
- ✅ Category filter on homepage
- ✅ Category badges on posts
- ✅ Combined category + search filtering
- ✅ New API endpoint for categories
- ✅ Updated API responses with category
- ✅ Beautiful gradient badge styling

**Status:** Fully implemented and tested ✅

---

**Last Updated:** November 13, 2025
