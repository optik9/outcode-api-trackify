const db = require('../config/database');

class TimesheetModel {
  static async  getTimesheets (startDate, endDate) {
    const query =`
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
    `;
    
    try {
      const [rows] = await db.query(query, [startDate, endDate]); // Extraemos solo las filas
      return rows;
    } catch (error) {
      throw new Error(`Error getting timesheets: ${error.message}`);
    }

  }

}

module.exports = TimesheetModel;