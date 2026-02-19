```md
# 🛠️ Task Management System - Backend

Backend API for the Task Management System built with:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- HTTP-only Cookies

---

## 🚀 Features

- User Registration
- Login / Logout
- JWT Authentication
- Email Verification
- Password Reset
- Admin Role Authorization
- Task Assignment
- Secure Cookie Handling

---

## 📂 Project Structure

server/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
└── server.js


---

## ⚙️ Environment Variables

Create a `.env` file in root:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000


---

## 🛠️ Installation

Clone repository:

```bash
git clone https://github.com/YOUR_USERNAME/backend-repo.git
cd backend-repo
Install dependencies:

npm install
Start development server:

npm run dev
Server runs on:

http://localhost:8000
🔐 Authentication System
JWT stored in HTTP-only cookies

withCredentials: true required on frontend

CORS must be configured with:

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
📌 API Routes
🔑 Auth Routes
POST   /api/v1/register
POST   /api/v1/login
GET    /api/v1/logout
GET    /api/v1/login-status
GET    /api/v1/user
PATCH  /api/v1/user
PATCH  /api/v1/change-password
POST   /api/v1/forgot-password
POST   /api/v1/reset-password/:token
👨‍💼 Admin Routes
GET     /api/v1/admin/users
DELETE  /api/v1/admin/users/:id
POST    /api/v1/admin/assign-task
🗄️ Database Models
User Model
name

email

password (hashed)

role (user/admin)

tasks (array of task references)

Task Model
title

assignedTo (User reference)

🔒 Security Features
Password hashing (bcrypt)

JWT Authentication

Role-based authorization

Protected routes middleware

HTTP-only cookies

Input validation
