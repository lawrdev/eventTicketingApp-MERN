const { cloudinary, cloudinaryConfig } = require('./utils/cloudinary');
const express = require('express')
require('colors')
require('dotenv').config()
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000

// connect to database
connectDB()

const app = express()
// get POST body data in Express
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))

// Routes
app.use('/api/users', require('./Routes/userRoutes'))
app.use('/api/events', require('./Routes/eventRoutes'))

app.use('/public/events', require('./Routes/publicRoutes'))

// cloudinary
app.get("/get-signature", (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
        { timestamp: timestamp },
        cloudinaryConfig.api_secret
    )

    res.json({ timestamp, signature })
})
app.post("/image-info", async (req, res) => {
    // based on the public_id and the version that the (potentially malicious) user is submitting...
    // cloudinary func that checks the returned version and public_id against our hidden api secret and returns an expected signature
    const expectedSignature = cloudinary.utils.api_sign_request(
        {
            public_id: req.body.public_id,
            version: req.body.version
        }, cloudinaryConfig.api_secret
    )

    if (expectedSignature === req.body.signature) {
        //   do someting with the id and other parameters
        res.json({ img_id: req.body.public_id, })
    } else {
        res.json({ mssg: 'Not authorized' })
    }
})

// error handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

