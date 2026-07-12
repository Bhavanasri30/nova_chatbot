# 🤖 Nova AI Chatbot

A full-stack AI chatbot application that provides intelligent conversations using Large Language Model capabilities. Nova allows users to interact with an AI assistant, manage conversations, and store chat history with a modern ChatGPT-like interface.

## 🌐 Live Demo

**Frontend:**  
nova-chatbot-zihx-mj7qj36a7-novaaichatbot.vercel.app

**Backend API:**  
https://nova-chatbot-kwt6.onrender.com

---

# 📌 Project Overview

Nova AI Chatbot is a full-stack conversational AI application built to provide a smooth and interactive AI chat experience.

Users can create accounts, log in, start conversations, and receive AI-generated responses. The application uses a React frontend, Node.js backend, MongoDB database, and Groq AI API for generating intelligent responses.

The project demonstrates full-stack development, API integration, database management, authentication, and cloud deployment.

---

# ✨ Features

## 🔐 Authentication
- User signup and login
- Secure password handling
- User-specific chat data

## 💬 AI Chat
- Real-time AI conversations
- ChatGPT-like messaging interface
- AI-generated responses using Groq API

## 📝 Chat History
- Save previous conversations
- Create new chats
- View old conversations
- Delete chat history

## 🎨 User Interface
- Modern responsive design
- Clean chatbot interface
- Smooth user experience

## ☁️ Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlas

---

# 🏗️ System Architecture

```
                  User
                    |
                    ↓
          React + Vite Frontend
                  (Vercel)
                    |
                    ↓
          Node.js + Express API
                  (Render)
                    |
        -------------------------
        |                       |
        ↓                       ↓
 MongoDB Atlas              Groq API
(Database)              (AI Responses)
```

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- JavaScript
- CSS
- Axios

## Backend
- Node.js
- Express.js
- REST API
- JWT Authentication

## Database
- MongoDB Atlas
- Mongoose ODM

## AI Integration
- Groq API
- Large Language Model API

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```
nova_chatbot
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── App.jsx
│   └── package.json
│
├── backend
│   ├── controllers
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   └── chatHistoryController.js
│   │
│   ├── routes
│   ├── models
│   ├── services
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Bhavanasri30/nova_chatbot.git

cd nova_chatbot
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔄 Application Workflow

1. User creates an account
2. User logs into the application
3. User sends a message
4. Frontend sends request to backend API
5. Backend communicates with Groq AI
6. AI response is returned
7. Conversation is stored in MongoDB
8. User can access chat history anytime

---

# 🔒 Environment Variables

Sensitive information is stored using environment variables.

Required variables:

```
MONGO_URI
GROQ_API_KEY
PORT
NODE_ENV
VITE_API_URL
```

---

# 🚀 Deployment

## Frontend
Deployed using:

```
Vercel
```

## Backend
Deployed using:

```
Render
```

## Database

```
MongoDB Atlas
```

---

# 🎯 Future Improvements

- Voice input support
- Image-based conversations
- File upload and document analysis
- Better AI memory
- Streaming AI responses
- Dark/light theme improvements
- Mobile application

---

# 👩‍💻 Author

**Bhavanasri Kona**

B.Tech Data Science Student  
Aspiring Full Stack Developer | AI Enthusiast

GitHub:
https://github.com/Bhavanasri30

LinkedIn:
https://www.linkedin.com/in/bhavanasri-kona-a90309322/

---

# ⭐ Acknowledgements

- Groq API for AI inference
- MongoDB Atlas for database hosting
- Vercel and Render for cloud deployment
