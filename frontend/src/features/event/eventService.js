import axios from 'axios'

const API_URL = '/api/events/'

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

// Get user Event
const getEvent = async (eventId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + eventId, config)

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
        { status: 'cancel' },
        config
    )

    return response.data
}

const eventService = {
    createNewEvent,
    getEvents,
    getEvent,
    cancelEvent,
}

export default eventService