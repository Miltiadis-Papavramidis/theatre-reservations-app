const pool = require('../config/db');

exports.createReservation = async (req, res) => {
  try {
    const { user_id, showtime_id, seat_id } = req.body;

    const [seat] = await pool.query(
      'SELECT * FROM seats WHERE seat_id = ? AND is_reserved = FALSE',
      [seat_id]
    );

    if (seat.length === 0) {
      return res.status(400).json({ message: 'Seat already reserved' });
    }

    await pool.query(
      `INSERT INTO reservations 
      (user_id, showtime_id, seat_id, status) 
      VALUES (?, ?, ?, ?)`,
      [user_id, showtime_id, seat_id, 'confirmed']
    );

    await pool.query(
      'UPDATE seats SET is_reserved = TRUE WHERE seat_id = ?',
      [seat_id]
    );

    res.status(201).json({
      message: 'Reservation completed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;

    const [reservations] = await pool.query(
      `SELECT 
        reservations.reservation_id,
        reservations.status,
        reservations.created_at,
        shows.title,
        showtimes.show_date,
        showtimes.show_time,
        seats.seat_number
      FROM reservations
      JOIN showtimes ON reservations.showtime_id = showtimes.showtime_id
      JOIN shows ON showtimes.show_id = shows.show_id
      JOIN seats ON reservations.seat_id = seats.seat_id
      WHERE reservations.user_id = ?`,
      [userId]
    );

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const [reservation] = await pool.query(
      'SELECT seat_id FROM reservations WHERE reservation_id = ?',
      [id]
    );

    if (reservation.length === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    const seatId = reservation[0].seat_id;

    await pool.query(
      "UPDATE reservations SET status = 'cancelled' WHERE reservation_id = ?",
      [id]
    );

    await pool.query(
      'UPDATE seats SET is_reserved = FALSE WHERE seat_id = ?',
      [seatId]
    );

    res.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};