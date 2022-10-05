// bring in JWT and asyncHandler and User model
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// func for protecting routes
const protect = asyncHandler(async (req, res, next) => {

    // initialize a token variable
    let token;

    // check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log('herrrre', error)
            res.status(401)
            throw new Error('not authorized')
        }
    }

    // check if no token
    if (!token) {
        res.status(401)
        throw new Error('not authorized')
    }
})

module.exports = { protect }