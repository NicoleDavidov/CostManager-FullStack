const express = require('express');
const router = express.Router();

/**
 * @file costRoute.js
 * @route POST /api/add
 * @description Rout to add a new cost item to the database
 */

const { addCostItem } = require('../controllers/cost_controller');

router.post('/add', addCostItem); // POST request to add a cost item

module.exports = router;


