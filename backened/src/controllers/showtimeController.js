const pool = require("../config/db");

exports.getShowtimesByShow = async (req, res) => {
  try {
    const { showId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT 
        showtime_id,
        show_date,
        show_time,
        price
      FROM showtimes
      WHERE show_id = ?
      ORDER BY show_date, show_time ASC
      `,
      [showId],
    );

    // format για frontend
    const showtimes = rows.map((s) => ({
      showtime_id: s.showtime_id,
      show_date: s.show_date,
      show_time: s.show_time,
      price: s.price,
    }));

    res.json(showtimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
