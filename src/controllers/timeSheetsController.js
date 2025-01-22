const TimesheetModel = require('../models/timesheet');

class timeSheetsController {
  static async getTimeSheets(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate and endDate are required.',
        });
      }

      console.log(`Fetching timesheets between ${startDate} and ${endDate}`);

      const timesheets = await TimesheetModel.getTimesheets(startDate, endDate);

      if (!timesheets || timesheets.length === 0) {
        return res.json({
          success: true,
          message: 'No timesheets found for the given dates.',
          data: [],
        });
      }

      res.json({
        success: true,
        data: timesheets,
        count: timesheets.length
        
      });
    } catch (error) {
      console.error('Error in getTimeSheets:', error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = timeSheetsController;