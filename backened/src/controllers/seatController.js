const pool = require('../config/db');

exports.getSeatsByShowtime = async (req, res) => {
  try {
    const { showtimeId } = req.params;

    const [seats] = await pool.query(
      'SELECT * FROM seats WHERE showtime_id = ?',
      [showtimeId]
    );

    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};