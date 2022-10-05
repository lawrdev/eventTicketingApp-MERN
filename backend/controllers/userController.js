const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const User = require('../models/userModel')

// @desc    Register new user
// @route   /api/users/register
// @access  Pubkic
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
        password: hashedPassword,
    })

    // if user was created, we send a new json data back
    if (user) {
        res.status(201).json({
            // '_id' is how mongoDB stores id so,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Login a user
// @route   /api/users/login
// @access  Pubkic
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // find the user
    const user = await User.findOne({ email })

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            // '_id' is how mongoDB stores id so,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        // unaurthorized
        res.status(401)
        throw new Error('Invalid credentials')
    }

})

// @desc    get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {

    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }

    // this should send back the user's info without password
    res.status(200).json(user)
})


// move the func below to different file


// Generate Token func
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            // means token will expire in 30Days
            expiresIn: '30d'

        })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}