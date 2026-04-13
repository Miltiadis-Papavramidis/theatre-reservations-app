/*CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

    CREATE TABLE theatres (
    theatre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    description TEXT
);

CREATE TABLE shows (
    show_id INT AUTO_INCREMENT PRIMARY KEY,
    theatre_id INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT,
    age_rating VARCHAR(20),
    FOREIGN KEY (theatre_id) REFERENCES theatres(theatre_id)
);

CREATE TABLE showtimes (
    showtime_id INT AUTO_INCREMENT PRIMARY KEY,
    show_id INT,
    show_date DATE,
    show_time TIME,
    price DECIMAL(10,2),
    FOREIGN KEY (show_id) REFERENCES shows(show_id)
);

CREATE TABLE seats (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    showtime_id INT,
    seat_number VARCHAR(10),
    is_reserved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id)
);

CREATE TABLE reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    showtime_id INT,
    seat_id INT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id),
    FOREIGN KEY (seat_id) REFERENCES seats(seat_id)
);

INSERT INTO shows (title, description, duration, age_rating)
VALUES
('Avengers:Endgame', 'Marvel sci-fi action movie', 120, '13+'),
('Interstellar', 'Epic space adventure drama', 150, '10+');

INSERT INTO showtimes (show_id, show_date, show_time, price)
VALUES
(1, '2026-06-01', '20:00:00', 15.00),
(1, '2026-06-02', '21:00:00', 15.00),
(2, '2026-06-03', '19:30:00', 18.00);

INSERT INTO seats (showtime_id, seat_number, is_reserved)
VALUES
(1, 'A1', FALSE),
(1, 'A2', FALSE),
(1, 'A3', TRUE),
(1, 'B1', FALSE),
(1, 'B2', FALSE);


*/

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;