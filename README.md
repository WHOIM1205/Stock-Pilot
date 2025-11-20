🏗️ Inventory Management System
Built with FastAPI, Python, SQLAlchemy, MySQL/SQLite & Docker — with a modern animated frontend.

A seamless inventory management solution designed for modern businesses.
This project includes a complete backend API, a beautifully animated frontend, 3D UI elements, and full containerized deployment.

🚀 Features
✅ Backend (FastAPI)

User Authentication (JWT)

Product Management (CRUD)

Category Management

Stock Tracking & Alerts

Order & Supplier Management

SQLAlchemy ORM Models

MySQL / SQLite support

Automatically generated API Docs (Swagger & Redoc)

Dockerized backend for instant deployment

🎨 Frontend

Landing Page

3D hero elements (Spline/Three.js)

Smooth scroll animations

Futuristic UI styling

Login Page

Animated background

Clean UI forms (Email + Password)

Dashboard

Product table + filters

Overview metrics (Stock, Orders, Low stock)

Graphs for analytics

Sidebar navigation

Micro-interactions & smooth animations (GSAP/Framer)

🛠️ Tech Stack
Backend

Python

FastAPI

SQLAlchemy ORM

MySQL / SQLite

Docker & Docker Compose

Frontend

HTML / CSS / JavaScript (or React)

Three.js / Spline (for 3D)

GSAP / Framer Motion (for animations)

📁 Project Structure
Inventory-Management/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── database/
│   ├── routers/
│   ├── models/
│   └── schemas/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── assets/
│   ├── js/
│   └── css/
│
├── docker-compose.yml
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/inventory-management.git
cd inventory-management

2️⃣ Backend Setup
Create virtual environment
cd backend
python -m venv env
source env/bin/activate      # Mac / Linux
env\Scripts\activate         # Windows

Install dependencies
pip install -r requirements.txt

Run FastAPI Server
uvicorn main:app --reload

Open API Docs

Swagger UI → http://localhost:8000/docs
Redoc → http://localhost:8000/redoc

3️⃣ Run with Docker (Recommended)

Make sure Docker is installed.

docker-compose up --build


Backend → http://localhost:8000
MySQL container auto-starts.

🌐 Frontend Setup

Navigate to /frontend and open:

index.html → Landing page

login.html → Login page

dashboard.html → Main dashboard

If using React or Vite, run:

npm install
npm run dev

🔌 Connecting Frontend with Backend

Update your API base URL in frontend/js/config.js:

export const API_BASE = "http://localhost:8000";

📊 API Endpoints Overview
Authentication
POST /auth/login
POST /auth/register

Products
GET    /products
POST   /products
PUT    /products/{id}
DELETE /products/{id}

Stock
GET  /stock
PUT  /stock/update

Orders & Suppliers
GET  /orders
POST /orders
GET  /suppliers
POST /suppliers

🎥 Screenshots / Demo (Optional)

(Add screenshots of your landing page, login page, dashboard, 3D animations etc.)

🧩 Future Improvements

Barcode scanning

Role-based access (Admin/User)

Mobile responsive dashboard

Email alerts for low stock

AI-powered demand prediction

🤝 Contributing

Contributions are welcome.
Please create an issue or pull request.

📜 License

MIT License.
