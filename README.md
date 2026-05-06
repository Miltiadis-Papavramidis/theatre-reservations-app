🎭 Theatre Reservations App

A full-stack mobile application for theatre booking and reservation management.
Users can browse theatres, explore shows and showtimes, and book seats directly from a mobile interface.

🚀 Tech Stack
📱 Frontend
React Native (Expo)
Axios
Expo Router
Expo Secure Store

🌐 Backend
Node.js
Express.js
JWT Authentication
RESTful API
🗄 Database
MariaDB / MySQL
🔧 Tools
Git & GitHub
Postman (API testing)

✨ Features
👤 Authentication
User registration & login
Password hashing (secure storage)
JWT-based authentication
Protected API routes via middleware

🎭 Theatres & Shows
Browse theatres
View show details
Theatre location & description
Show duration & pricing

🕒 Showtimes
View available showtimes
Date & time selection
Dynamic pricing per showtime

💺 Seat Selection
Interactive seat grid UI
Real-time seat availability
Prevent booking already reserved seats

🎟 Reservations
Create reservation (multiple seats per booking)
View user reservations
Cancel only future reservations
Reservation status tracking

❤️ Favorites
Add/remove favorite shows
Local persistence (can be extended to DB)

📲 Mobile App
Android emulator support
Expo Go support
Responsive UI
API integration

📂 Project Structure
theatre-reservations-app/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── routes/
│ │ └── models/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── app/
│ ├── components/
│ ├── context/
│ ├── services/
│ ├── assets/
│ └── package.json
│
└── README.md

⚙️ Setup Instructions
1️⃣ Backend
cd backend
npm install
npm run dev

Server runs on:

http://localhost:5000
2️⃣ Frontend
cd frontend
npm install
npx expo start

Run on:

Android Emulator
Expo Go
Physical device

🔐 Authentication Flow
User logs in
Backend returns JWT token
Token is stored securely (Expo Secure Store)
Token is sent in API requests
Middleware validates access

📡 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Theatres
GET /api/theatres
Shows
GET /api/shows
Showtimes
GET /api/showtimes/:show_id
Reservations
POST /api/reservations
GET /api/reservations/user
PUT /api/reservations/:id/cancel
🗄 Database Schema

Main tables:

users
theatres
shows
showtimes
reservations
reservation_seats (many-to-many seats per reservation)

🚧 Future Improvements
💳 Payment integration (Stripe)
🔔 Push notifications
🎟 QR ticket generation
👨‍💼 Admin dashboard
🌍 Deployment (Docker + cloud)
❤️ Store favorites in database
📊 Analytics & logging
👨‍💻 Author

Miltiadis Papavramidis

Full-stack mobile application developed as part of a university project.

⭐ Notes

This project follows a production-oriented architecture with:

Separation of frontend/backend
Secure authentication
Scalable database design
Clean API structure
