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

    //  if name, email and password are valid
    // check if user already exsits
    const userExists = await User.findOne({ email })
    // method that finds one document matching the argument ( email: email )

    if (userExists) {
        throw new Error('User already exists')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // creae user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    // if user was created, we send a new json data back
    if (user) {
        // status(201) means susccessful and something added
        res.status(201).json({
            // '_id' is how mongoDB stores id so,
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
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