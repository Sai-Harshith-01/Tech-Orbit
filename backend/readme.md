# 🚀 TechOrbit – Backend Service

A scalable and secure backend system for **TechOrbit**, built using **FastAPI** and **MongoDB**, designed to power a real-time platform that provides students with technology updates, internship opportunities, and collaborative project support.

This repository contains only the **backend services** responsible for APIs, authentication, database operations, and integrations.

---

## 🎯 Purpose

The TechOrbit backend is designed to:

* Serve data efficiently to frontend clients
* Handle authentication and authorization
* Manage users, internships, and AI-based features
* Ensure scalability and performance for real-world usage

---

## ⚙️ Tech Stack

* **Framework:** FastAPI
* **Language:** Python
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens)
* **API Docs:** OpenAPI (Swagger UI)
* **Async Support:** Uvicorn
* **Environment Config:** python-dotenv

---

## 🔑 Core Features

* 🔐 Secure Authentication & Authorization
* 👤 Role-based Access (Student / Admin / Faculty)
* 📢 Internship & Opportunity APIs
* 🤖 AI Prompt-based APIs
* 📁 File Upload Handling
* 📊 Admin Panel APIs
* ⚡ High Performance Async APIs
* 🧩 Modular Architecture

---

## 📁 Folder Structure

```
backend/
│
├── app/
│   ├── routers/        # API routes
│   ├── models/         # MongoDB schemas
│   ├── services/       # Business logic
│   ├── core/           # Security, config, settings
│   └── main.py         # Application entry point
│
├── prompts/            # AI prompt templates
├── uploads/            # Uploaded files storage
│
├── requirements.txt    # Dependencies
└── readme.md           # Documentation
```

---

## 🚀 Getting Started

### Step 1: Clone the Backend Repo

```bash
git clone https://github.com/your-username/Tech-Orbit.git
cd Tech-Orbit/backend
```

---

### Step 2: Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate # Linux/Mac
```

---

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Step 4: Environment Setup

Create a `.env` file in backend root:

```
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
JWT_SECRET=your_jwt_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

⚠️ Never push `.env` to GitHub.

---

### Step 5: Run Backend Server

```bash
uvicorn app.main:app --reload
```

Server URL:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

## 🔐 Authentication Flow

1. User registers / logs in
2. JWT token generated
3. Token passed in Authorization header
4. Protected APIs accessed securely

---

## 📦 Deployment

This backend can be deployed on:

* Render
* Railway
* AWS EC2
* DigitalOcean
* VPS servers

Example production start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## 🛠️ Best Practices Used

* Modular architecture
* Clean API separation
* Async request handling
* Secure JWT-based auth
* Environment-based config
* Scalable folder structure

---

## 👨‍💻 Author

**Sai Harshith**
Backend Developer – TechOrbit
Focused on building real-world scalable systems.

---

## 📄 License

This project is developed for educational and professional portfolio purposes.

---


