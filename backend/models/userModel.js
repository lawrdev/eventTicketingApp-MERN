const mongoose = require('mongoose')

// create a schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    img: {
        data: Buffer,
        contentType: String
    },
    profile: {
        type: Object,
        required: false
    },
    // users needing extra permissions
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)