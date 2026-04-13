# 🎭 Theatre Reservations App

A full-stack mobile theatre reservation system developed for theatre booking and reservation management.

This project allows users to browse theatres, view available shows and showtimes, and make reservations directly from a mobile application.

---

## 🚀 Tech Stack

### Frontend
- React Native
- Expo
- Axios
- React Navigation
- Expo Secure Store

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST API

### Database
- MariaDB / MySQL

### Version Control
- Git & GitHub

---

## 📱 Features

### 👤 User Authentication
- User registration
- User login
- Password hashing
- JWT token authentication
- Protected routes with middleware

### 🎭 Theatre Management
- Get all theatres
- Theatre descriptions
- Theatre locations

### 🎬 Shows
- Get all shows
- Show details
- Theatre relation
- Duration & age rating

### 🕒 Showtimes
- View available showtimes
- Show date and time
- Theatre hall information

### 🎟 Reservations
- Create reservation
- View reservation history
- Reservation status
- Future reservation updates/cancel support

### 📲 Mobile App
- Android emulator support
- Expo Go support
- Fast refresh development
- API integration with Axios

---

## 📂 Project Structure

```text
theatre-reservations-app
│
├── backened
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   └── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   └── assets
│
├── database
│
└── README.md

## Backened Setup
 - cd backened
 - npm install
 - nodemon server.js

 Backend runs on:

http://localhost:5000

Frontend Setup
cd frontend
npm install
npx expo start

Run on:

Android Emulator
Expo Go
Physical Android device

🗄 Database Tables

The database contains the following tables:

users
theatres
shows
showtimes
reservations

Authentication

The system uses JWT authentication.

Flow
User logs in
Backend returns JWT token
Frontend stores token securely
Token is sent in protected requests
Middleware verifies token access

API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Theatres
GET /api/theatres
Shows
GET /api/shows
Showtimes
GET /api/showtimes
Reservations
POST /api/reservations
GET /api/reservations

🎯 Future Improvements
Seat selection UI
Payment integration
Admin dashboard
QR ticket generation
OIDC / OAuth2 authentication
Push notifications

Author

Miltiadis Papavramidis

Developed as a full-stack distributed systems university project.