const express = require('express');
const router = express.Router();
const { getMonthlyReport } = require('../controllers/report_controller');

/**
 * @file reportRoute.js
 * @route GET /api/report
 * @description Route to get JSON object with userid, year, month, and costs grouped by category
 */

router.get('/report', getMonthlyReport);

module.exports = router;
