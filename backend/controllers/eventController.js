const asyncHandler = require('express-async-handler')
const dayjs = require('dayjs')

// NOTE: no need to get the user, we already have that on req object from protect middleware.
// The protect middleware already checks for valid user.


const Event = require('../models/eventModel')
const today = dayjs()
const todayTimestamp = today.valueOf()

// @desc    get user events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {

    // assign evens related to user
    const events = await Event.find({ user: req.user.id })

    res.status(200).json(events)
})

// @desc    get events by SEARCH
// @route   GET /public/events/search
// @access  Public
const getSearchEvents = asyncHandler(async (req, res) => {

    const { q } = req.params
    const events = await Event.find(
        {
            'details.title': {
                "$regex": q,
                "$options": "i"
            }
        })
    if (!events) {
        res.status(200).json({ mssg: 'No matching event' })
    }

    res.status(200).json(events)
})

// @desc    get events by Category
// @route   GET /public/events/category/:q
// @access  Public
const getCategoryEvents = asyncHandler(async (req, res) => {

    const { q } = req.params
    const events = await Event.find(
        {
            eventType: {
                "$regex": q,
                "$options": "i"
            }
        })

    if (!events) {
        res.status(200).json({ mssg: 'No matching event type' })
    }

    res.status(200).json(events)
})

// @desc    get ALL events
// @route   GET /public/events/all/:lastId
// @access  Public
const getAllEvents = asyncHandler(async (req, res) => {

    const { lastDate } = req.params
    const docCount = await Event.countDocuments({})

    // load more [ 3 ]
    const events = await Event.find({ eventDate: { $gt: parseInt(lastDate) } }).sort({ eventDate: +1 }).limit(3)

    // get eventDate of last event
    let lastItemIndex = events.length - 1
    let lastEventDate = events[lastItemIndex].eventDate
    // Update status
    if (events) {
        events.forEach(async (item) => {
            const eventDate = dayjs(item.details.date)
            const dayCount = eventDate.diff(today, 'day')

            if (dayCount < 0) {
                item.status = 'Closed'
            } else if ((dayCount >= 0) && (dayCount < 8)) {
                item.status = 'Happening'
            } else {
                item.status = 'Upcoming'
            }
            await item.save()
        })
    }
    res.status(200).json({ events, lastEventDate, length: docCount })
})

// @desc    get single user event
// @route   GET /public/events/:id
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

    const { eventDate, eventType, details } = req.body

    if (!eventType || !details || !eventDate) {
        res.status(400)
        throw new Error('Please include all fields and provide a date')
    }

    // create event
    const event = await Event.create({
        eventDate,
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
    getAllEvents,
    getCategoryEvents
}