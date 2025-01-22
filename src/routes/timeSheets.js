const express = require('express');
const { getTimeSheets } = require('../controllers/timeSheetsController');
const router = express.Router();

router.get('/timesheets', getTimeSheets);

module.exports = router;