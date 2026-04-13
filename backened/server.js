require('dotenv').config();

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const authRoutes = require("./src/routes/authRoutes");
const theatreRoutes = require("./src/routes/theatreRoutes");
const showRoutes = require("./src/routes/showRoutes");
const showtimesRoutes = require("./src/routes/showtimeRoutes");
const seatRoutes = require("./src/routes/seatRoutes");  
const reservationRoutes = require("./src/routes/reservationRoutes");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Theatre Reservation API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/showtimes", showtimesRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/reservations", reservationRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
