const pool = require("../config/db");

exports.getSeatsByShowtime = async (req, res) => {
  try {
    const { showtimeId } = req.params;

    const [seats] = await pool.query(
      `
      SELECT 
        s.seat_id,
        s.seat_number,
        s.showtime_id,
        CASE 
          WHEN r.reservation_id IS NOT NULL THEN true 
          ELSE false 
        END AS is_reserved
      FROM seats s
      LEFT JOIN reservation_seats rs 
        ON s.seat_id = rs.seat_id
      LEFT JOIN reservations r 
        ON rs.reservation_id = r.reservation_id 
        AND r.status = 'booked'
        AND r.showtime_id = s.showtime_id
      WHERE s.showtime_id = ?
      `,
      [showtimeId]
    );

    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};