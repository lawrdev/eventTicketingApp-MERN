const mongoose = require('mongoose')

// create a schema
const eventSchema = mongoose.Schema({
    // each event will be connected to a user
    user: {
        // relate field to object's id, via mongoose
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // to show which collection 'ObjectId' refers to = 'Users'
        ref: 'User'
    },
    ticket: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        members: [String]
    },
    eventType: {
        type: String,
        required: [true, 'Please select an event type'],
        // specific events tickets can be created for
        enum: ['Party', 'Meeting', 'Virtual', 'Music', 'Comedy show', 'Training', 'Conference', 'Gaming', 'Private', 'Other'],
    },
    details: {
        type: Object,
        required: [true, 'Please include all necessary details for this event']
    },
    eventDate: {
        type: Number,
        required: [true, 'Please include an eventDate']
    },
    status: {
        type: String,
        required: true,
        enum: ['Upcoming', 'Happening', 'Closed'],
        default: 'upcoming'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)