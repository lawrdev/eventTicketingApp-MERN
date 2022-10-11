const express = require('express')
require('colors')
require('dotenv').config()
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000

// connect to database
connectDB()

const app = express()
// allow data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./Routes/userRoutes'))
app.use('/api/events', require('./Routes/eventRoutes'))

// error handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

