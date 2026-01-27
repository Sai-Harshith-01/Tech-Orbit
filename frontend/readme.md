# 🌐 TechOrbit – Frontend

A modern and responsive frontend application for **TechOrbit**, built using **React.js + Vite + Tailwind CSS**, designed to deliver a smooth user experience for students exploring technology news, internships, and collaborative ideas.

This repository contains only the **frontend client-side application**.

---

## 🎯 Purpose

The TechOrbit frontend is responsible for:

* User interface & user experience
* Consuming backend APIs
* Displaying tech updates & internships
* Managing authentication state
* Providing an intuitive and responsive design

---

## ⚙️ Tech Stack

* **Framework:** React.js
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **State Management:** React Hooks / Context API
* **HTTP Client:** Axios / Fetch
* **Routing:** React Router DOM
* **PostCSS:** Yes

---

## ✨ Features

* 📱 Fully Responsive UI
* 🔐 Login & Registration UI
* 📢 Tech News & Internship Display
* 🔄 API Integration with Backend
* ⚡ Fast loading using Vite
* 🎨 Tailwind-based modern UI
* 🌙 Clean and scalable design

---

## 📁 Folder Structure

```
frontend/
│
├── public/
│   └── news-default/      # Static assets
│
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   ├── services/         # API calls
│   ├── context/          # Auth & global state
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── readme.md
```

---

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/Tech-Orbit.git
cd Tech-Orbit/frontend
```

---

### Step 2: Install Dependencies

```bash
npm install
```

---

### Step 3: Configure Backend API

Create a `.env` file in frontend root:

```
VITE_API_BASE_URL=http://localhost:8000
```

⚠️ Do not push `.env` to GitHub.

---

### Step 4: Run Development Server

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

## 🔗 API Integration

The frontend consumes backend APIs for:

* Authentication
* Internships
* News updates
* IdeaWaves features

All API calls are centralized in:

```
src/services/
```

---

## 📦 Build for Production

```bash
npm run build
```

Then deploy the generated `dist/` folder.

---

## 🌍 Deployment Options

Frontend can be deployed on:

* Vercel
* Netlify
* Render
* Firebase Hosting

---

## 🧠 Best Practices Used

* Component-based architecture
* API abstraction layer
* Reusable UI components
* Tailwind utility-first design
* Environment-based config
* Responsive layout

---

## 👨‍💻 Author

**Sai Harshith**
Frontend Developer – TechOrbit
Focused on building scalable & user-friendly interfaces.

---

## 📄 License

This project is developed for educational and professional portfolio purposes.

---


