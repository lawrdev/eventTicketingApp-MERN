const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 8000

// connect to database
connectDB()

const app = express()
// allow data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/api/users', (req, res) => {
    res.status(202).json({ message: "Welcome to your desk bro" })
})


// Routes
app.use('/api/users', require('./Routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

