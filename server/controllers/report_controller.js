const Cost = require('../models/Cost');
const User = require('../models/User');

/**
 * @file report_controller.js
 * @async
 * @function getMonthlyReport
 * @description Retrieves a monthly cost report for a given user, grouped by category.
 *              Each category will include a list of costs or be empty if no costs exist.
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters: id (user ID), year, month
 * @param {Object} res - Express response object
 * @returns {Object} JSON object with userid, year, month, and grouped costs by category
 */

const getMonthlyReport = async (req, res) => {
    try {

        const { id, year, month } = req.query; // Extract user ID, year, and month from the query parameters in the URL

        if (!id || !year || !month) {  //Validate that all required query parameters are provided
            return res.status(400).json({ error: 'Missing required query parameters: id, year, or month' });
        }

        const userId = parseInt(id);
        const reportYear = parseInt(year);
        const reportMonth = parseInt(month);

        if (isNaN(userId) || isNaN(reportYear) || isNaN(reportMonth)) { // Ensure the query parameters are valid numbers.
            return res.status(400).json({ error: 'Query parameters id, year, and month must be valid numbers' });
        }


        if (reportMonth < 1 || reportMonth > 12) {  // Check if month is in valid range
            return res.status(400).json({ error: 'Month must be a number between 1 and 12' });
        }

        const userExists = await User.findOne({ id: Number(id) });
        if (!userExists) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const costs = await Cost.find({ // View the user's expenses by month and year
            userid: userId,
            year: reportYear,
            month: reportMonth
        });


        const categories = ['food', 'health', 'housing', 'sport', 'education']; // categories of costs

        const groupedCosts = categories.map(category => ({
            [category]: []
        }));


        costs.forEach(cost => {  // sorting the expenses by category and putting them into the right structure
            const categoryGroup = groupedCosts.find(group => Object.keys(group)[0] === cost.category);
            if (categoryGroup) {
                categoryGroup[cost.category].push({
                    sum: cost.sum,
                    description: cost.description,
                    day: cost.day
                });
            }
        });

        res.json({
            userid: userId,
            year: reportYear,
            month: reportMonth,
            costs: groupedCosts
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getMonthlyReport };
