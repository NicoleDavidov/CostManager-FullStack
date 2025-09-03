const Cost = require('../models/Cost');
const User = require('../models/User');

/**
 * @file cost_controller.js
 * Checks if a given combination of day, month, and year is a valid calendar date.
 * @param {number} day - Day of the month
 * @param {number} month - Month (1-12)
 * @param {number} year - Year (e.g., 2025)
 * @returns {boolean} True if the date is valid, otherwise false
 */

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

/**
 * @async
 * @function addCostItem
 * @description Adds a new cost item for a given user.Validates required fields and sets current date if not provided.
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body with:userid,description,category,sum,and optional day,month,year
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON with the saved cost or an error message
 */

const addCostItem = async (req, res) => {
    try {
        const { userid, description, category, sum, day, month, year } = req.body;

        if (!userid || !description || !category || !sum) {      // Validate required fields
            return res.status(400).json({ error: 'Missing info' });
        }


        const userExists = await User.findOne({ id: userid });  // Check if user exists
        if (!userExists) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const currentDate = new Date();  // Use the current date as default if no date is given
        const costDay = day || currentDate.getDate();
        const costMonth = month || currentDate.getMonth() + 1;
        const costYear = year || currentDate.getFullYear();

        if (day && month && year) {
            if (!isValidDate(costDay, costMonth, costYear)) {
                return res.status(400).json({ error: 'Invalid date provided' });
            }
        }

        const newCost = new Cost({ // Create a new cost item using the request body
            userid,
            description,
            category,
            sum,
            day: costDay,
            month: costMonth,
            year: costYear
        });

        const savedCost = await newCost.save();
        return res.status(201).json(savedCost);
    } catch (error) {
        return res.status(500).json({ error: 'Server error', message: error.message });
    }
};
module.exports = { addCostItem };