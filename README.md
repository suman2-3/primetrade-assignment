# Primetrade Backend Assignment

##  Overview

This project is a full-stack application built to demonstrate a secure and scalable REST API with a functional frontend.

The backend is developed using Node.js and Express, implementing JWT-based authentication, bcrypt password hashing, and role-based access control (User/Admin). It includes complete CRUD operations for task management with protected routes.

The frontend is built using React, providing authentication flows and a dashboard to interact with APIs in real-time.

The application is fully deployed on Render (backend + frontend), with environment configuration and API testing handled via Postman.

Overall, the project covers authentication, authorization, CRUD operations, frontend integration, and deployment readiness.

It includes:

* Authentication using JWT
* Role-based access control (User/Admin)
* Task management system (CRUD operations)
* Fully deployed backend and frontend

---

##  Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt (Password Hashing)

### Frontend

* React.js
* Axios
* React Router

### Deployment

* Backend: Render
* Frontend: Render

---

##  Features

###  Authentication

* User Registration
* User Login
* Password hashing using bcrypt
* JWT-based authentication

###  Role-Based Access

* User and Admin roles
* Protected routes
* Admin dashboard support

###  Task Management

* Create Task
* View Tasks
* Mark Complete / Incomplete
* Delete Task

---

## Live Demo

### Frontend

👉 https://primetrade-assignment-1-j3pj.onrender.com

### Backend API

👉 https://primetrade-assignment-wlnz.onrender.com

---

##  API Endpoints

### Auth Routes

* POST /auth/register
* POST /auth/login

###  Task Routes

* GET /tasks
* POST /tasks
* PUT /tasks/:id
* DELETE /tasks/:id

---

##  Setup Instructions

### Clone Repository

```bash
git clone https://github.com/suman2-3/primetrade-assignment
cd primetrade-assignment
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

##  Environment Variables

Create `.env` in backend:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

##  API Testing

Test APIs using Postman.
https://drive.google.com/drive/folders/1sWFs080JoiwbO4lFFT47zA1-ye_h8Uqy

---

##  Scalability & Deployment Readiness

The application is designed with scalability and production-readiness in mind.

###  Scalability

* The backend follows a modular architecture (routes, controllers, services), making it easy to extend and maintain.
* Database scalability can be improved using indexing, sharding, and optimized queries in MongoDB.
* Caching mechanisms like Redis can be integrated to reduce database load and improve performance.
* The system can be split into microservices for handling authentication, task management, and user services independently.
* Load balancing (e.g., using Nginx) can distribute traffic across multiple instances.

###  Deployment Readiness

* The backend and frontend are deployed separately using Render, following industry practices.
* Environment variables are securely managed using `.env` files.
* The backend dynamically uses `process.env.PORT`, ensuring compatibility with cloud platforms.
* CORS is configured to allow communication between frontend and backend.
* The frontend is built into static files for optimized production performance.
* API endpoints are tested using Postman to ensure reliability.

### Future Improvements

* Containerization using Docker for consistent deployments
* CI/CD pipeline integration (GitHub Actions)
* Logging and monitoring (Winston, Prometheus)
* HTTPS & security enhancements (Helmet, rate limiting)

Overall, the project is structured to handle growth in users and traffic while maintaining performance and reliability.

---

##  Author

Suman Kumari
https://github.com/suman2-3
