const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    // 'res.ststusCode' is whatever 'res.status(x)' we set in the userController func, if not set then use 500
    res.status(statusCode)
    // now we set the res here to the statusCode
    res.json({
        message: err.message,
        // 'err' has a ' .message' property on it
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
        // we want stack to only show when we are not in production mode
    })
}

module.exports = { errorHandler }