const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc Register new user
// @route /api/users/register
// @access Pubkic
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    res.send('Register route here')
})

// @desc Login a user
// @route /api/users/login
// @access Pubkic
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login route here')
})



module.exports = {
    registerUser,
    loginUser
}