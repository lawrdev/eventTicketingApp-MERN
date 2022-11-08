import axios from 'axios'

const API_URL = '/api/events/'
const PUBLIC_API_URL = '/public/events/'
const SEARCH_API = '/public/events/search/'
const CATEGORY_API = '/public/events/category/'
const EVENT_CREATOR_API = '/public/events/creator/'


//  PRIVATE

// Create new Event
const createNewEvent = async (eventData, token) => {
    // because we need to send a bearer token
    const config = {
        headers: {
            // formatted like this `Bearer ${token}` because in our backend, our auth Middleware is setup to;
            // token = req.headers.authorization.split(' ')[1]
            // also not this is also how postmann sends the data
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, eventData, config)

    return response.data
}

// Get user Events
const getEvents = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Event Update
const eventUpdates = async (eventData, token) => {

    const { eventId, userId, task } = eventData
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + eventId, { userId, task }, config)

    return response.data
}

// Cancel event
const cancelEvent = async (eventId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(
        API_URL + eventId,
        { status: 'Closed' },
        config
    )

    return response.data
}

// Delete event
const deleteEvent = async (eventId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + eventId, config)

    return response.data
}


// PUBLIC

// Get all Events - [ public ]
const getAllEvents = async (lastDate) => {

    const response = await axios.get(`${PUBLIC_API_URL}all/${lastDate}`)
    return response.data
}

// Get Event - [ public ]
const getEvent = async (eventId) => {

    const response = await axios.get(PUBLIC_API_URL + eventId)

    return response.data
}
// Get Search Event
const getSearchEvents = async (q) => {

    const response = await axios.get(SEARCH_API + q)

    return response.data
}
// Get Category Event
const getCategoryEvents = async (q) => {

    const response = await axios.get(CATEGORY_API + q)

    return response.data
}
// Get Event Creator
const getEventCreator = async (uid) => {

    const response = await axios.get(EVENT_CREATOR_API + uid)

    return response.data
}


const eventService = {
    createNewEvent,
    deleteEvent,
    getEvents,
    getSearchEvents,
    cancelEvent,
    eventUpdates,
    getEvent,
    getAllEvents,
    getEventCreator,
    getCategoryEvents
}

export default eventService