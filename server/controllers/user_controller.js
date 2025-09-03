const User = require('../models/User');
const Cost = require('../models/Cost');

/**
 * @file user_controller.js
 * @async
 * @function getUserById
 * @param {Object} req - Express request object
 * @param {Object} req.params - Parameters passed in the route
 * @param {string} req.params.id - The ID of the user to retrieve
 * @param {Object} res - Express response object
 * @returns {Object} JSON object with user's id, first name, last name, and total expenses.
 */


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ id: parseInt(id) }); // Search for the user in the database by the ID received from the URL
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get all the user's costs and sum them to calculate the total expenses
        const costs = await Cost.find({ userid: parseInt(id) });
        const total = costs.reduce((sum, cost) => sum + cost.sum, 0);

        res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            total
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getUserById };
