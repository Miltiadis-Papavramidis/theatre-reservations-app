const pool = require('../config/db');

exports.theatres = async (req, res) => {
  try {
    const [theatres] = await pool.query("SELECT * FROM theatres");
    res.json(theatres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}