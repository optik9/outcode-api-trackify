const getTimesheets = async (startDate, endDate) => {
    const [rows] = await pool.execute(`
      SELECT 
        users.name AS user_name,
        projects.name AS project_name,
        ts.description,
        ts.time_from,
        ts.time_to,
        ts.duration,
        ts.createdAt
      FROM time_sheets ts
      JOIN users ON ts.user_id = users.id
      JOIN projects ON ts.project_id = projects.id
      WHERE date(ts.createdAt) BETWEEN ? AND ?
    `, [startDate, endDate]);
    
    return rows;
  };