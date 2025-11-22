# Stock Pilot Web Application

A simple, modern Inventory Management System built with FastAPI, SQLite, and Vanilla JS.

## Features
- **Landing Page**: Modern UI with smooth animations.
- **Login System**: Simple authentication (Default: `admin` / `admin123`).
- **Dashboard**: Manage products (Add, Edit, Delete).
- **REST API**: Full CRUD operations for products.

## Tech Stack
- **Backend**: Python, FastAPI, SQLite
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)

## Setup & Run

### Prerequisites
- Python 3.8+ installed.

### Steps

1.  **Clone/Download the project**.

2.  **Create a virtual environment** (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Initialize the database**:
    ```bash
    python backend/database.py
    ```
    This creates `inventory.db` with `products` and `users` tables.

5.  **Run the application**:
    ```bash
    uvicorn backend.main:app --reload
    ```

6.  **Open in Browser**:
    Go to [http://localhost:8000](http://localhost:8000)

## API Documentation
FastAPI provides automatic interactive documentation:
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Default Credentials
- **Username**: `admin`
- **Password**: `admin123`
