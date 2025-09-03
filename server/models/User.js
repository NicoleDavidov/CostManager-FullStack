const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @file User.js
 * @typedef {Object} User
 * @property {number} id - The unique ID of the user
 * @property {string} first_name - The user's first name
 * @property {string} last_name - The user's last name
 * @property {string} birthday - The user's birthdate in ISO format
 * @property {string} marital_status - The user's marital status
 */

const userSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true //`unique` ensures uniqueness of the ID by creating a unique index in MongoDB.
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    marital_status: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
