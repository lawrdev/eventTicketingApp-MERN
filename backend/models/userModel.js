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
        type: String,
        default: 'blank_bkx8aq'
    },
    profile: {
        type: Object,
        default: {}
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