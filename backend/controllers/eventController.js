const asyncHandler = require('express-async-handler')

// NOTE: no need to get the user, we already have them on req object from protect middleware.
// The protect middleware already checks for valid user.

const Event = require('../models/eventModel')

// @desc    get user events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {

    // assign evens related to user
    const events = await Event.find({ user: req.user.id })

    res.status(200).json(events)
})
// @desc    get events by SEARCH
// @route   GET /api/events
// @access  Private
const getSearchEvents = asyncHandler(async (req, res) => {

    const { searchValue } = req.body
    // assign evens related to user
    const events = await Event.find(
        {
            'details.title': {
                "$regex": searchValue,
                "$options": "i"
            }
        })
    // { 'details.title': searchValue }
    if (!events) {
        res.status(200).json({ mssg: none })
    }

    res.status(200).json(events)
})
// @desc    get ALL events
// @route   GET /api/events
// @access  Public
const getAllEvents = asyncHandler(async (req, res) => {

    // assign evens related to user
    const events = await Event.find({})

    res.status(200).json(events)
})
// @desc    get single user event
// @route   GET /api/events/:id
// @access  Public
const getEvent = asyncHandler(async (req, res) => {

    const { id } = req.params
    const event = await Event.findById(id)
    if (!event) {
        res.status(404)
        throw new Error('Events not found')
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
        status: 'Upcoming'
    })

    res.status(201).json(event)
})

// @desc    delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {

    const { id } = req.params
    const event = await Event.findById(id)
    // const event = await Event.findById(req.params.id)

    if (!event) {
        res.status(404)
        throw new Error('Event not found')
    }

    // limit who can delete an event to only owner of the event
    if (event.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    // delete this event
    await event.remove()

    res.status(200).json('done')
    // res.status(200).json({ success: true })
})

// @desc    EVENT UPDATES [ book, unbook]
// @route   PUT /api/events/:id
// @access  Private
const eventUpdates = asyncHandler(async (req, res) => {

    const { userId, task } = req.body

    if (task === 'book') {
        const event = await Event.findById(req.params.id)
        if (!event) {
            res.status(404)
            throw new Error('Event not found')
        }

        // book event
        const arr = event.ticket.members;
        const checkArr = arr.find(element => element == req.user.id)
        if (checkArr) {
            res.status(200).json(event)
        } else {
            event.ticket.members.push(req.user.id)
            await event.save()
        }

    } else if (task === 'unbook') {
        let event = await Event.findById(req.params.id)
        if (!event) {
            res.status(404)
            throw new Error('Event not found')
        }

        // unbook event
        let arr = event.ticket.members;
        let filteredArr = arr.filter(element => element !== req.user.id)

        event.ticket.members = filteredArr

        await event.save()
        res.status(200).json(event)
    }

})


module.exports = {
    getEvents,
    getSearchEvents,
    getEvent,
    createEvent,
    eventUpdates,
    deleteEvent,
    getAllEvents
}