const pool = require('../config/db');

exports.getShows = async (req, res) => {
  try {
    const [shows] = await pool.query(`
      SELECT 
        shows.show_id,
        shows.title,
        shows.description,
        shows.duration,
        shows.age_rating,
        theatres.name AS theatre_name
      FROM shows
      JOIN theatres ON shows.theatre_id = theatres.theatre_id
    `);

    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};