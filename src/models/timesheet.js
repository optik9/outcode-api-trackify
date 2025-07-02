const db = require('../config/database');
const moment = require('moment-timezone');

class TimesheetModel {
  static async getTimesheets(startDate, endDate) {
   /* const query = `
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
    `; */

     const query = `
            SELECT 
            users.name AS user_name, 
            projects.name AS project_name, 
            ts.description,
            ts.time_from,
            ts.time_to,
            ts.duration,
            ts.createdAt,
            CASE
                  WHEN TRIM(users.phone) REGEXP '^(\\\\+51|0051)' THEN 'Peru'
                  WHEN TRIM(users.phone) REGEXP '^(\\\\+59|0059)' THEN 'Peru'
                  WHEN TRIM(users.phone) REGEXP '^(\\\\+977|00977)' THEN 'Nepal'
                  WHEN TRIM(users.phone) REGEXP '^(\\\\+1|001)' THEN 'USA'
                  WHEN TRIM(users.phone) REGEXP '^(\\\\+63|0063)' THEN 'USA'
                  ELSE 'Other'
            END AS location
            
        FROM 
            time_sheets ts
        JOIN 
            users ON ts.user_id = users.id
        JOIN 
            projects ON ts.project_id = projects.id

        WHERE 
            
            date(ts.createdAt) BETWEEN ? AND ?
            `;
    try {
      const [rows] = await db.query(query, [startDate, endDate]);

      // Formateamos los valores sin cambiar la zona horaria
      const timesheets = rows.map(row => ({
        ...row,
        time_from: row.time_from ? moment(row.time_from).format('YYYY-MM-DD hh:mm:ss A') : null,
        time_to: row.time_to ? moment(row.time_to).format('YYYY-MM-DD hh:mm:ss A') : null,
        createdAt: row.createdAt ? moment(row.createdAt).format('YYYY-MM-DD hh:mm:ss A') : null
      }));

      return timesheets;
    } catch (error) {
      throw new Error(`Error getting timesheets: ${error.message}`);
    }
  }
}

module.exports = TimesheetModel;