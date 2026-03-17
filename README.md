# 🚀 TechOrbit

### *Student Article Discovery & Hackathon Management Platform*

TechOrbit is a **scalable full-stack web platform** designed to empower students, colleges, and administrators by providing a unified ecosystem for:

* Hackathon discovery & management
* Technical article publishing
* Real-time tech news updates
* Secure registration workflows
* AI-assisted navigation

Built with a modern architecture, TechOrbit focuses on **usability, scalability, and real-world applicability**.

---

# 📌 Table of Contents

* [Overview](#-overview)
* [Objectives](#-objectives)
* [Key Features](#-key-features)
* [Payment Verification System](#-payment-verification-system)
* [Tech Stack](#-tech-stack)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [API Documentation](#-api-documentation)
* [Installation & Setup](#-installation--setup)
* [Deployment](#-deployment)
* [Security](#-security)
* [Troubleshooting](#-troubleshooting)
* [Future Enhancements](#-future-enhancements)
* [License](#-license)

---

# 📖 Overview

TechOrbit bridges the gap between **students seeking opportunities** and **institutions organizing them** by offering a centralized digital platform.

It integrates:

* Hackathon lifecycle management
* Article publishing system
* AI chatbot assistant
* Automated tech news aggregation

---

# 🎯 Objectives

### 👨‍🎓 Students

* Discover and register for hackathons
* Pay participation fees securely
* Upload payment proof
* Explore and publish technical articles
* Stay updated with latest technologies
* Access AI-based assistance

### 🏫 Colleges

* Create and manage hackathons
* Define event registration fees
* Verify student payments
* Track participation analytics
* Showcase institutional achievements

### 🛠️ Admins

* Approve colleges
* Monitor platform activities
* Publish official articles
* Access system-wide analytics

---

# 🌟 Key Features

## 🏆 Hackathon Management

* Create, update, delete hackathons
* Student registration system
* Participation tracking

## 📚 Article System

* Publish technical articles
* Explore community content

## 📰 Tech News Aggregation

* Automated RSS-based news fetching
* Real-time updates from sources like TechCrunch

## 🤖 Orbiton AI Chatbot

* Smart navigation assistant
* FAQ handling
* Feature guidance

## 🔔 Notifications

* Real-time updates for users
* Status tracking

---

# 💳 Payment Verification System

TechOrbit introduces a **manual payment verification workflow** to ensure secure and authentic registrations.

## 🔄 Workflow

1. Student registers for a hackathon
2. Student completes payment externally (UPI/Bank)
3. Student uploads payment screenshot
4. Status set to **Pending Verification**
5. College reviews submission
6. College admin:

   * ✅ Approves → Registration confirmed
   * ❌ Rejects → Student notified

## ✨ Features

* Secure file upload system
* Status tracking (`Pending`, `Approved`, `Rejected`)
* Role-based access control
* Fraud prevention via manual verification
* Notification support

---

# 🌐 Tech Stack

## Frontend

* React 18
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* JWT Authentication

## Backend

* Flask (REST API)
* Flask-SQLAlchemy
* JWT Authentication
* Feedparser (RSS engine)
* Werkzeug Security
* CORS

---

# 🏗️ Architecture

TechOrbit follows a **modular monorepo architecture**:

```
Frontend (React)
        ↓
REST API (Flask)
        ↓
Database (SQLAlchemy ORM)
        ↓
Workers (RSS Feed Engine)
```

---

# 📁 Project Structure

## Backend

```
backend/
├── app/
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── hackathon_routes.py
│   │   ├── student_hackathon_routes.py
│   │   ├── student_article_routes.py
│   │   ├── admin_routes.py
│   │   ├── admin_stats_routes.py
│   │   ├── college_stats_routes.py
│   │   ├── rss_routes.py
│   │   └── payment_routes.py
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── hackathon_service.py
│   │   ├── article_service.py
│   │   ├── registration_service.py
│   │   ├── payment_service.py
│   │   ├── notification_service.py
│   │   └── stats_service.py
│   │
│   ├── schemas/
│   │   ├── user_schema.py
│   │   ├── hackathon_schema.py
│   │   ├── article_schema.py
│   │   ├── registration_schema.py
│   │   ├── payment_schema.py
│   │   └── rss_schema.py
│   │
│   ├── utils/
│   │   ├── jwt_handler.py
│   │   ├── password_hash.py
│   │   ├── file_upload.py
│   │   └── role_checker.py
│   │
│   ├── workers/
│   │   └── rss_worker.py
│   │
│   ├── database.py
│   └── main.py
│
├── uploads/
├── requirements.txt
└── .env.example
```

---

## Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── HackathonCard.jsx
│   │   ├── ArticleCard.jsx
│   │   ├── NewsCard.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotificationBell.jsx
│   │   ├── PaymentUpload.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── StudentDashboard.jsx
│   │   ├── CollegeDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── CreateHackathon.jsx
│   │   ├── PaymentVerification.jsx
│   │   ├── Hackathons.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── hackathonService.js
│   │   ├── articleService.js
│   │   ├── paymentService.js
│   │   ├── newsService.js
│   │   └── notificationService.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# 📡 API Documentation

## 🔐 Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## 🏆 Hackathons

```
GET    /api/hackathons
POST   /api/hackathons
PUT    /api/hackathons/:id
DELETE /api/hackathons/:id
```

## 🎓 Student

```
POST /api/student/hackathons/:id/register
GET  /api/student/articles
```

## 💳 Payments

```
POST /api/payments/upload
GET  /api/payments/:hackathonId
PUT  /api/payments/:id/approve
PUT  /api/payments/:id/reject
```

## 🛑 Admin

```
GET  /api/admin/colleges
PUT  /api/admin/colleges/:id/approve
GET  /api/admin/stats
POST /api/admin/articles
```

---

# ⚙️ Installation & Setup

## Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env
python create_admin.py
flask run
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🚀 Deployment

## Frontend (Vercel / Netlify)

```bash
npm run build
```

Environment:

```
VITE_API_URL=https://your-backend-url/api
```

---

## Backend (Render / Railway / VPS)

```
FLASK_ENV=production
DATABASE_URL=postgresql://...
```

Run:

```
gunicorn app.main:app
```

---

# 🔒 Security

* JWT-based authentication
* Password hashing (Werkzeug)
* Role-based access control
* Secure file upload handling
* CORS protection

---

# 🐛 Troubleshooting

## Backend

| Issue      | Solution              |
| ---------- | --------------------- |
| DB errors  | Reinitialize database |
| CORS issue | Check `.env` config   |

## Frontend

| Issue           | Solution               |
| --------------- | ---------------------- |
| API not working | Verify API URL         |
| Build errors    | Reinstall dependencies |

---

# 🔮 Future Enhancements

* Razorpay / Stripe integration
* Real-time payment verification
* AI-based recommendation system
* Mobile app (React Native)
* Advanced analytics dashboard
* Fraud detection system

---

# 📄 License

MIT License © 2026 TechOrbit

---

# 👤 Author

**Sai Harshith**
**Siddhartha**
**Lahari**
**Shiva**
**Sree Vyshnavi**
