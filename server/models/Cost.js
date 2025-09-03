const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @file Cost.js
 * @typedef {Object} Cost
 * @property {number} userid - ID of the user
 * @property {string} description - Description of the cost
 * @property {string} category - Category of the cost (food, health, housing, sport, education)
 * @property {number} sum - Amount spent
 * @property {number} day - Day of the month
 * @property {number} month - Month number
 * @property {number} year - Year number
 */
const costSchema = new Schema({
    userid: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ['food', 'health', 'housing', 'sport', 'education'], // Allows only specific values for the 'category' field
        required: true
    },
    sum: {
        type: Number,
        required: true,
        min: 0 // Sets the minimum allowed value for the sum
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12 // Ensures the month field can only be a number between 1 and 12
    },
    year: {
        type: Number,
        required: true
    }
});

const Cost= mongoose.model('Cost', costSchema);
module.exports = Cost;
