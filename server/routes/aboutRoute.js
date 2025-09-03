const express = require('express');
const router = express.Router();

/**
 * @file aboutRoute.js
 * @route GET /api/about
 * @description Returns a list of the developers' first and last names
 * @returns {Object[]} JSON array of developer objects
 */

router.get('/about', (req, res) => {
    res.json([
        { first_name: 'Nicole', last_name: 'Davidov' },
        { first_name: 'Polina', last_name: 'Shchulepova' }
    ]);
});

module.exports = router;
