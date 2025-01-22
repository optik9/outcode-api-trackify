

const express = require('express');
const router = express.Router();
const timeSheetsController = require('../controllers/timeSheetsController');

router.get('/timesheets', timeSheetsController.getTimeSheets);

module.exports = router;



