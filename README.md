# 🌸 HerSphere — AI-Powered Women's Wellness Companion

![Frontend](https://img.shields.io/badge/Frontend-React.js-blue)
![Backend](https://img.shields.io/badge/Backend-Flask-green)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)
![Deployment](https://img.shields.io/badge/Deployed-Vercel-black)

> An AI-powered women's wellness platform designed to help women understand, track, and improve their health journey through technology, personalized insights, and intelligent assistance.

## 🌐 Live Demo

Frontend:
https://hersphere-clean-gu6g.vercel.app/

Backend:
https://herspherebackend.onrender.com/


---

# 🌱 About HerSphere

HerSphere is a full-stack wellness platform focused on women's health and well-being.

The platform provides a personalized digital space where users can track their menstrual cycle, monitor mood patterns, maintain nutrition habits, and interact with an AI-powered wellness assistant.

The goal of HerSphere is to make women's health tracking more accessible, informative, and empowering through the combination of **Artificial Intelligence, Data Tracking, and User-Centered Design**.

---

# ✨ Features

## 🔐 Authentication & User Management

- Secure user authentication using Clerk
- Personalized user profiles
- User-specific wellness experience
- Profile information management


---

## 🌸 Menstrual Cycle Tracker

A dedicated cycle tracking system that helps users understand their menstrual health.

Features:

- Track last period date
- Customize cycle length
- Predict upcoming periods
- Estimate ovulation date
- Calculate fertile window
- Monitor cycle patterns


---

## 💭 Mood Tracker

A mental wellness feature that allows users to record and understand emotional patterns.

Features:

- Daily mood logging
- Add personal notes
- Maintain mood history
- Track emotional wellness patterns


---

## 🥗 Nutrition Tracker

A wellness module designed to encourage healthier lifestyle choices.

Features:

- Nutrition tracking
- Food habit monitoring
- Wellness awareness


---

## 🤖 HerSphere AI Assistant

An intelligent chatbot powered by Google's Gemini API.

The AI assistant helps users with:

- Women's wellness queries
- Lifestyle suggestions
- General health guidance
- Personalized conversations


---

## 📊 Wellness Dashboard

A centralized dashboard providing users quick access to their wellness journey.

Includes:

- User overview
- Health activities
- Quick navigation
- Personalized wellness sections


---

## 👤 Profile Management

Users can view:

- Profile picture
- Name
- Email information
- Account details
- Wellness navigation options


---

# 🏗️ System Architecture


                     User
                       |
                       |
                React Frontend
                (Vite + React)
                       |
                       |
                 REST API Calls
                       |
                       |
                Flask Backend
                       |
      --------------------------------
      |                              |

PostgreSQL Database Gemini AI API
|
|
User Health Information



---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Clerk Authentication


## Backend

- Python
- Flask
- Flask REST APIs
- Flask-CORS
- SQLAlchemy


## Database

- PostgreSQL


## Artificial Intelligence

- Google Gemini API


## Deployment

Frontend:
- Vercel

Backend:
- Render


---

# 📂 Project Structure



HerSphere

│
├── backend
│ │
│ ├── routes
│ │ ├── chat.py
│ │ ├── cycle.py
│ │ ├── mood.py
│ │ └── user.py
│ │
│ ├── models
│ │ ├── user.py
│ │ ├── mood.py
│ │ └── cycle.py
│ │
│ ├── services
│ │ └── gemini_service.py
│ │
│ ├── app.py
│ └── requirements.txt
│
│
├── src
│ │
│ ├── components
│ │
│ ├── pages
│ │ ├── Home.jsx
│ │ ├── Dashboard.jsx
│ │ ├── CycleTracker.jsx
│ │ ├── MoodTracker.jsx
│ │ ├── Nutrition.jsx
│ │ ├── Reports.jsx
│ │ └── Profile.jsx
│ │
│ ├── services
│ │ └── api.js
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── package.json
└── README.md



---

# 🚀 Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/hersphere.git

cd hersphere
Frontend Setup

Install dependencies:

npm install

Create a .env file:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

Run frontend:

npm run dev

The application will run on:

http://localhost:5173
Backend Setup

Navigate to backend:

cd backend

Install dependencies:

pip install -r requirements.txt

Create a .env file:

DATABASE_URL=your_postgresql_database_url

GEMINI_API_KEY=your_gemini_api_key

Run backend:

python app.py

Backend will run on:

http://localhost:5000
🔄 Application Workflow
User Signup/Login
        |
        |
      Clerk
        |
        |
 User Profile Creation
        |
        |
 PostgreSQL Database
        |
        |
 Health Tracking Features
        |
        |
 AI Wellness Assistance

🎯 Future Enhancements

Future improvements planned for HerSphere:

Personalized AI health recommendations
Advanced wellness analytics
Health report generation
Nutrition database integration
Reminder notifications
AI-based cycle insights
Mobile application development
💡 Motivation

Women's health is an important area that requires more awareness, accessibility, and personalized support.

HerSphere aims to bridge the gap between technology and women's wellness by providing a digital companion that helps users understand their bodies, track important health patterns, and make informed decisions.

👩‍💻 Developer

Samriddhi Shrivastava

Integrated M.Tech Data Science Student

Interests:

Artificial Intelligence
Machine Learning
Data Science
Full Stack Development
Women's Health Technology
⭐ Support

If you find this project interesting, consider giving it a star ⭐ on GitHub.


This version is more **portfolio/recruiter friendly** and highlights the fact that 
