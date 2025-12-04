# Inventory Manager Frontend

A clean, modern frontend for the FastAPI Inventory Management System built with vanilla HTML, CSS, and JavaScript.

## Features

✨ **Complete Functionality**
- User authentication (Login & Signup)
- Add, Edit, Delete inventory items
- Search/filter items by name
- Responsive design
- Smooth animations and transitions

## Folder Structure

```
/frontend
├── index.html              # Landing page
├── login.html              # Login page
├── signup.html             # Signup page
├── dashboard.html          # Main dashboard
├── /css
│   └── style.css          # All styles with animations
└── /js
    ├── auth.js            # Authentication guard
    ├── login.js           # Login logic
    ├── signup.js          # Signup logic
    └── dashboard.js       # Dashboard CRUD operations
```

## How to Run

### 1. Start the Backend Server

First, make sure your FastAPI backend is running on `http://localhost:8000`:

```bash
cd Backend
python main.py
```

### 2. Serve the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Then serve the files using Python's built-in HTTP server:

```bash
# Python 3
python -m http.server 8080

# Or Python 2
python -m SimpleHTTPServer 8080
```

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

## Usage Guide

### First Time Users

1. **Landing Page**: Click "Sign Up" to create an account
2. **Sign Up**: Enter username and password, then click "Sign Up"
3. **Login**: After successful signup, you'll be redirected to login
4. **Dashboard**: Once logged in, you can:
   - Add new inventory items
   - Search for items by name
   - Edit existing items (click Edit button)
   - Delete items (click Delete button)

### API Endpoints Used

The frontend connects to these backend endpoints:

- `POST /signup` - Create new user
- `POST /login` - Authenticate user
- `GET /stock/` - Get all items
- `GET /stock/?name={name}` - Search items
- `POST /stock/` - Add new item
- `PUT /stock/{id}` - Update item
- `DELETE /stock/{id}` - Delete item

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Design Features

- **Modern UI**: Gradient backgrounds, smooth transitions
- **Animations**: Fade-in effects, hover states
- **Responsive**: Works on desktop, tablet, and mobile
- **Form Validation**: Client-side validation for all inputs
- **Error Handling**: Clear error messages for failed operations

## Security

- Protected dashboard route (redirects to login if not authenticated)
- LocalStorage for session management
- Input sanitization to prevent XSS

---

**Note**: This frontend is designed to work with the existing FastAPI backend. Do not modify the backend code - all endpoints are used exactly as provided.
