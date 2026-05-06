const pool = require("../config/db");

exports.getShows = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        shows.show_id,
        shows.title,
        shows.description,
        shows.duration,
        shows.age_rating,
        shows.image,
        theatres.name AS theatre_name,
        theatres.location,
        showtimes.showtime_id,
        showtimes.show_date,
        showtimes.show_time,
        showtimes.price
      FROM shows
      JOIN theatres ON shows.theatre_id = theatres.theatre_id
      LEFT JOIN showtimes ON shows.show_id = showtimes.show_id
      ORDER BY shows.show_id, showtimes.show_date, showtimes.show_time ASC
    `);

    const showsMap = {};

    rows.forEach((row) => {
      console.log("ROW:", row);
      if (!showsMap[row.show_id]) {
        showsMap[row.show_id] = {
          show_id: row.show_id,
          title: row.title,
          description: row.description,
          duration: row.duration,
          age_rating: row.age_rating,
          image: row.image,
          theatre_name: row.theatre_name,
          location: row.location,
          showtimes: [],
        };
      }

      if (row.showtime_id) {
        showsMap[row.show_id].showtimes.push({
          showtime_id: row.showtime_id,
          date: row.show_date,
          time: row.show_time,
          price: row.price,
        });
      }
    });

    res.json(Object.values(showsMap));
  } catch (error) {
    console.error("BACKEND ERROR 👉", error);
    res.status(500).json({ error: error.message });
  }
};
