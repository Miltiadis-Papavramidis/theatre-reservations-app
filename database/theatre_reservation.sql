-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 06 Μάη 2026 στις 14:07:41
-- Έκδοση διακομιστή: 10.4.32-MariaDB
-- Έκδοση PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `theatre_reservation`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `showtime_id` int(11) DEFAULT NULL,
  `status` enum('booked','cancelled') DEFAULT 'booked',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `user_id`, `showtime_id`, `status`, `created_at`) VALUES
(1, 1, 2, 'booked', '2026-05-05 18:59:52'),
(2, 1, 1, 'booked', '2026-05-05 19:00:33'),
(3, 1, 2, 'booked', '2026-05-05 19:00:51'),
(4, 1, 1, 'booked', '2026-05-05 19:02:01'),
(5, 1, 2, 'cancelled', '2026-05-05 19:04:10'),
(6, 1, 1, 'cancelled', '2026-05-05 19:05:06'),
(7, 1, 4, 'cancelled', '2026-05-05 19:13:49'),
(8, 1, 1, 'cancelled', '2026-05-05 19:13:58'),
(9, NULL, 2, '', '2026-05-05 19:15:56'),
(10, NULL, 2, '', '2026-05-05 19:15:56'),
(11, NULL, 2, '', '2026-05-05 19:15:56'),
(12, NULL, 1, '', '2026-05-05 19:22:29'),
(13, 1, 1, 'booked', '2026-05-05 19:34:48'),
(14, 1, 1, 'booked', '2026-05-05 19:35:26'),
(15, 1, 1, 'booked', '2026-05-05 19:35:47'),
(16, 1, 2, 'booked', '2026-05-06 10:45:37'),
(17, 1, 4, 'booked', '2026-05-06 10:45:49'),
(18, 1, 4, 'booked', '2026-05-06 10:46:14'),
(19, 1, 1, 'booked', '2026-05-06 10:47:31'),
(20, 1, 1, 'booked', '2026-05-06 10:48:08'),
(21, 1, 2, 'booked', '2026-05-06 10:48:17'),
(22, 1, 4, 'booked', '2026-05-06 10:48:26'),
(23, 1, 3, 'booked', '2026-05-06 10:48:30'),
(24, 1, 1, 'booked', '2026-05-06 11:19:29'),
(25, 1, 2, 'booked', '2026-05-06 11:19:33'),
(26, 1, 2, 'booked', '2026-05-06 11:19:38'),
(27, 5, 1, 'cancelled', '2026-05-06 11:41:02'),
(28, 5, 2, 'cancelled', '2026-05-06 11:41:21'),
(29, 5, 4, 'cancelled', '2026-05-06 11:41:41'),
(31, 5, 1, 'cancelled', '2026-05-06 11:50:07'),
(34, 5, 1, 'booked', '2026-05-06 11:50:49'),
(35, 5, 1, 'booked', '2026-05-06 11:53:15');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `reservation_seats`
--

CREATE TABLE `reservation_seats` (
  `id` int(11) NOT NULL,
  `reservation_id` int(11) DEFAULT NULL,
  `seat_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `reservation_seats`
--

INSERT INTO `reservation_seats` (`id`, `reservation_id`, `seat_id`) VALUES
(54, 34, 2),
(55, 34, 3),
(56, 35, 4),
(57, 35, 5),
(58, 35, 6);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `seats`
--

CREATE TABLE `seats` (
  `seat_id` int(11) NOT NULL,
  `showtime_id` int(11) DEFAULT NULL,
  `seat_number` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `seats`
--

INSERT INTO `seats` (`seat_id`, `showtime_id`, `seat_number`) VALUES
(1, 1, 'A1'),
(2, 1, 'A2'),
(3, 1, 'A3'),
(4, 1, 'A4'),
(5, 1, 'B1'),
(6, 1, 'B2'),
(7, 2, 'A1'),
(8, 2, 'A2'),
(9, 2, 'A3'),
(10, 2, 'B1'),
(11, 2, 'B2'),
(12, 3, 'A1'),
(13, 3, 'A2'),
(14, 3, 'A3'),
(15, 3, 'A4'),
(16, 3, 'A5'),
(17, 3, 'B1'),
(18, 3, 'B2'),
(19, 3, 'B3'),
(20, 3, 'B4'),
(21, 3, 'B5'),
(22, 4, 'A1'),
(23, 4, 'A2'),
(24, 4, 'A3'),
(25, 4, 'A4'),
(26, 4, 'A5'),
(27, 4, 'B1'),
(28, 4, 'B2'),
(29, 4, 'B3'),
(30, 4, 'B4'),
(31, 4, 'B5');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `shows`
--

CREATE TABLE `shows` (
  `show_id` int(11) NOT NULL,
  `theatre_id` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `age_rating` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `shows`
--

INSERT INTO `shows` (`show_id`, `theatre_id`, `title`, `description`, `duration`, `age_rating`, `image`) VALUES
(1, 1, 'Avengers:Endgame', 'Marvel sci-fi action movie', 120, '13+', 'https://images.unsplash.com/photo-1503095396549-807759245b35'),
(2, 1, 'Interstellar', 'Epic space adventure drama', 150, '10+', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `showtimes`
--

CREATE TABLE `showtimes` (
  `showtime_id` int(11) NOT NULL,
  `show_id` int(11) DEFAULT NULL,
  `show_date` date DEFAULT NULL,
  `show_time` time DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `showtimes`
--

INSERT INTO `showtimes` (`showtime_id`, `show_id`, `show_date`, `show_time`, `price`) VALUES
(1, 1, '2026-06-01', '20:00:00', 15.00),
(2, 1, '2026-06-02', '21:00:00', 15.00),
(3, 2, '2026-06-03', '19:30:00', 18.00),
(4, 2, '2026-06-02', '19:30:00', 18.00);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `theatres`
--

CREATE TABLE `theatres` (
  `theatre_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `theatres`
--

INSERT INTO `theatres` (`theatre_id`, `name`, `location`, `description`) VALUES
(1, 'Ολύμπιο', 'Θεσσαλονίκη', 'Σύγχρονος χώρος για μεγάλες θεατρικές και μουσικές παραγωγές.');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'John', 'john@test.com', '$2b$10$vOua1XjJ54L2IE6hA4tAM.aZUhTTtLhMBbdPt528.PxL5gmEE77gC', '2026-04-12 20:23:55'),
(3, 'Giorgos', 'giorgos@example.com', '$2b$10$GKdqyzOwZ7Bne1/d4k2b1uDJM/4MJfrfND3AAbyoCWHV7LeiMNKV2', '2026-04-25 14:54:57'),
(4, 'Giorgos', 'george@example.com', '$2b$10$2wOk03gz.hvX5ppe3jCXouXkXv4uKwDoqg9SMqU5.ojOjtCC3fpci', '2026-05-06 11:11:57'),
(5, 'Kiriakos', 'kiriakos@example.com', '$2b$10$2cenjfZX5xONa2d2t9/tkOe7MVGxtRBaWPnYZxkcg7N05iedAXe9W', '2026-05-06 11:19:08');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `showtime_id` (`showtime_id`);

--
-- Ευρετήρια για πίνακα `reservation_seats`
--
ALTER TABLE `reservation_seats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `seat_id` (`seat_id`),
  ADD KEY `reservation_id` (`reservation_id`);

--
-- Ευρετήρια για πίνακα `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`seat_id`),
  ADD KEY `showtime_id` (`showtime_id`);

--
-- Ευρετήρια για πίνακα `shows`
--
ALTER TABLE `shows`
  ADD PRIMARY KEY (`show_id`),
  ADD KEY `theatre_id` (`theatre_id`);

--
-- Ευρετήρια για πίνακα `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`showtime_id`),
  ADD KEY `show_id` (`show_id`);

--
-- Ευρετήρια για πίνακα `theatres`
--
ALTER TABLE `theatres`
  ADD PRIMARY KEY (`theatre_id`);

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT για πίνακα `reservation_seats`
--
ALTER TABLE `reservation_seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT για πίνακα `seats`
--
ALTER TABLE `seats`
  MODIFY `seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT για πίνακα `shows`
--
ALTER TABLE `shows`
  MODIFY `show_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT για πίνακα `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `showtime_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT για πίνακα `theatres`
--
ALTER TABLE `theatres`
  MODIFY `theatre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT για πίνακα `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`showtime_id`);

--
-- Περιορισμοί για πίνακα `reservation_seats`
--
ALTER TABLE `reservation_seats`
  ADD CONSTRAINT `reservation_seats_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`),
  ADD CONSTRAINT `reservation_seats_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`);

--
-- Περιορισμοί για πίνακα `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`showtime_id`);

--
-- Περιορισμοί για πίνακα `shows`
--
ALTER TABLE `shows`
  ADD CONSTRAINT `shows_ibfk_1` FOREIGN KEY (`theatre_id`) REFERENCES `theatres` (`theatre_id`);

--
-- Περιορισμοί για πίνακα `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
