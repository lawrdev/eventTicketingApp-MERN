const asyncHandler = require('express-async-handler')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.
const Event = require('../models/eventModel')

// @desc    get user events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {

    // assign evens related to user
    const events = await Event.find({ user: req.user.id })

    res.status(200).json(events)
})

// @desc    get single user event
// @route   GET /api/events/:id
// @access  Private
const getEvent = asyncHandler(async (req, res) => {

    // to get an event, we use id, inside params, that is inside the req URL
    const event = await Event.findById(req.params.id)
    if (!event) {
        res.status(404)
        throw new Error('Events not found')
    }

    // limit who can get an event to only owners of the event
    if (event.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(event)
})

// @desc    create newEvents
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {

    const { eventType, details } = req.body

    if (!eventType || !details) {
        res.status(400)
        throw new Error('Please provide eventType and details')
    }

    // create event
    const event = await Event.create({
        eventType,
        details,
        user: req.user.id,
        status: 'upcoming'
    })

    res.status(201).json(event)
})


// @desc    delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {

    // to get event, we use id, inside params, that is inside the req URL
    const event = await Event.findById(req.params.id)
    if (!event) {
        res.status(404)
        throw new Error('Event not found')
    }

    // limit who can delete an event to only owner of the event
    if (event.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    // this function tells to model to delete this event
    await event.remove()

    res.status(200).json({ success: true })
})

// @desc    update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {

    // to get event, we use id, inside params, that is inside the req URL
    const event = await Event.findById(req.params.id)
    if (!event) {
        res.status(404)
        throw new Error('Event not found')
    }

    // limit who can get an event to only owner of the event
    if (event.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    // update event
    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    // '.findIdAndUpdate' takes 3 parameters
    // 'req.params.id' the event's id to find and update, because it's coming from the url
    // 'req.body' containing the update details('event' and 'details')
    // an options object, 'new: true' means if event does not exist, create a new one

    res.status(200).json(updatedEvent)
})


module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}