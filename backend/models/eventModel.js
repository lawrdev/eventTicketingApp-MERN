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
    eventType: {
        type: String,
        required: [true, 'Please select an event type'],
        // specific events tickets can be created for
        enum: ['Party or Social Gathering', 'Class, Training or Workshop', 'Screening', 'Meeting', 'Festival', 'Performance or Concerts', 'Tour', 'Game or Tournament', 'Conference', 'Playground', 'Private Party', 'VIP', 'Other'],
    },
    details: {
        type: Object,
        required: [true, 'Please include all necessary details for this event']
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