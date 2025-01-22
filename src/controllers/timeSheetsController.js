const db = require('../config/db');

const getTimeSheets = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'startDate and endDate are required.' });
  }

  try {
    const [rows] = await db.query(
      `SELECT
        users.name AS user_name,
        projects.name AS project_name,
        ts.description,
        ts.time_from,
        ts.time_to,
        ts.duration,
        ts.createdAt
      FROM
        time_sheets ts
      JOIN
        users ON ts.user_id = users.id
      JOIN
        projects ON ts.project_id = projects.id
      WHERE
        DATE(ts.createdAt) BETWEEN ? AND ?`,
      [startDate, endDate]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching time sheets.' });
  }
};

module.exports = { getTimeSheets };