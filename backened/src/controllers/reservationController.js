const pool = require("../config/db");

// ✅ CREATE RESERVATION
exports.createReservation = async (req, res) => {
  const conn = await pool.getConnection();

  try {
    const { showtime_id, seats } = req.body;
    const user_id = req.user.user_id;

    if (!showtime_id) {
      return res.status(400).json({ message: "Showtime ID is required" });
    }

    if (!seats || seats.length === 0) {
      return res.status(400).json({ message: "No seats selected" });
    }

    await conn.beginTransaction();

    // 🔒 check seats
    const [reservedSeats] = await conn.query(
      `
      SELECT rs.seat_id
      FROM reservation_seats rs
      JOIN reservations r ON rs.reservation_id = r.reservation_id
      WHERE rs.seat_id IN (?)
      AND r.status = 'booked'
      `,
      [seats],
    );

    if (reservedSeats.length > 0) {
      await conn.rollback();
      return res.status(400).json({
        message: "Some seats already reserved",
      });
    }

    // ✅ create reservation
    const [reservation] = await conn.query(
      `INSERT INTO reservations (user_id, showtime_id, status) 
       VALUES (?, ?, 'booked')`,
      [user_id, showtime_id],
    );

    const reservationId = reservation.insertId;

    // ✅ bulk insert seats (ΟΧΙ loop)
    const values = seats.map((seat_id) => [reservationId, seat_id]);

    await conn.query(
      `INSERT INTO reservation_seats (reservation_id, seat_id) VALUES ?`,
      [values],
    );

    await conn.commit();

    res.status(201).json({
      message: "Reservation completed successfully",
      reservation_id: reservationId,
    });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
};

// ✅ GET USER RESERVATIONS
exports.getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const user_id = req.user.user_id;

    const [reservations] = await pool.query(
      `
      SELECT 
        r.reservation_id,
        r.status,
        r.created_at,
        sh.title,
        sh.image,
        sh.show_id,
        th.name AS theatre_name,
        st.showtime_id,
        st.show_date,
        st.show_time,
        st.price,
        GROUP_CONCAT(s.seat_number ORDER BY s.seat_number SEPARATOR ', ') AS seats,
        COUNT(s.seat_id) AS total_seats
      FROM reservations r
      JOIN showtimes st ON r.showtime_id = st.showtime_id
      JOIN shows sh ON st.show_id = sh.show_id
      JOIN theatres th ON sh.theatre_id = th.theatre_id
      JOIN reservation_seats rs ON r.reservation_id = rs.reservation_id
      JOIN seats s ON rs.seat_id = s.seat_id
      WHERE r.user_id = ?
      GROUP BY r.reservation_id
      ORDER BY r.created_at DESC
      `,
      [user_id],
    );

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ CANCEL RESERVATION
exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Έλεγχος αν υπάρχει η κράτηση
    const [reservations] = await pool.query(
      `
  SELECT r.reservation_id, r.status, r.user_id, st.show_date, st.show_time
  FROM reservations r
  JOIN showtimes st ON r.showtime_id = st.showtime_id
  WHERE r.reservation_id = ?
  `,
      [id],
    );

    if (reservations[0].user_id !== req.user.user_id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const reservation = reservations[0];

    if (reservation.status === "cancelled") {
      return res.status(400).json({ message: "Reservation already cancelled" });
    }

    // 2. Έλεγχος αν η παράσταση έχει ήδη περάσει
    const showDateTime = new Date(
      `${reservation.show_date}T${reservation.show_time}`,
    );
    const now = new Date();

    if (showDateTime < now) {
      return res.status(400).json({
        message: "Cannot cancel past or ongoing shows",
      });
    }

    // 3. Ακύρωση κράτησης
    await pool.query(
      `UPDATE reservations SET status = 'cancelled' WHERE reservation_id = ?`,
      [id],
    );

    res.json({
      message: "Reservation cancelled successfully",
      reservation_id: id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE RESERVATION (αλλαγή ώρας/θέσεων)
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { showtime_id, seats } = req.body;

    // 1. Έλεγχος αν υπάρχει η κράτηση
    const [existing] = await pool.query(
      `SELECT user_id, status FROM reservations WHERE reservation_id = ?`,
      [id],
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (existing[0].status === "cancelled") {
      return res
        .status(400)
        .json({ message: "Cannot update cancelled reservation" });
    }

    const user_id = existing[0].user_id;

    // 2. Ακύρωση παλιάς κράτησης
    await pool.query(
      `UPDATE reservations SET status = 'cancelled' WHERE reservation_id = ?`,
      [id],
    );

    // 3. Δημιουργία νέας κράτησης
    const [newReservation] = await pool.query(
      `INSERT INTO reservations (user_id, showtime_id, status) 
       VALUES (?, ?, 'booked')`,
      [user_id, showtime_id],
    );

    const newReservationId = newReservation.insertId;

    // 4. Προσθήκη νέων θέσεων
    for (const seat_id of seats) {
      await pool.query(
        `INSERT INTO reservation_seats (reservation_id, seat_id) 
         VALUES (?, ?)`,
        [newReservationId, seat_id],
      );
    }

    res.json({
      message: "Reservation updated successfully",
      old_reservation_id: id,
      new_reservation_id: newReservationId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET SEATS BY SHOWTIME (βοηθητικό)
exports.getSeatsByShowtime = async (req, res) => {
  try {
    const { showtimeId } = req.params;

    // Όλες οι θέσεις για αυτό το showtime
    const [allSeats] = await pool.query(
      `
      SELECT 
        s.seat_id,
        s.seat_number,
        CASE WHEN rs.reservation_id IS NOT NULL AND r.status = 'booked' THEN true ELSE false END AS is_reserved
      FROM seats s
      LEFT JOIN reservation_seats rs ON s.seat_id = rs.seat_id
      LEFT JOIN reservations r ON rs.reservation_id = r.reservation_id AND r.status = 'booked'
      WHERE s.showtime_id = ?
      ORDER BY s.seat_number
      `,
      [showtimeId],
    );

    res.json(allSeats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
