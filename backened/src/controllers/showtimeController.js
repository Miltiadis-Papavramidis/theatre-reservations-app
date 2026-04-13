const pool = require('../config/db');

exports.getShowtimesByShow = async (req, res) => {
  try {
    const { showId } = req.params;

    const [showtimes] = await pool.query(
      'SELECT * FROM showtimes WHERE show_id = ?',
      [showId]
    );

    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};