const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected ${conn.connection.host}`.blue.underline)
    } catch (error) {
        console.log(error.message.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB