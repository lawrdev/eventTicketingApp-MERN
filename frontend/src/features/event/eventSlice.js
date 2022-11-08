import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventService from './eventService'
// NOTE: use an extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../util'

// component level
const initialState = {
    events: null,
    event: null,
    searchEvents: null,
    allEvents: null,
    lastEventDate: null,
    eventsLength: null,
    categoryEvents: null,
}


// CREATE NEW EVENT
export const createEvent = createAsyncThunk(
    'event/create',
    async (eventData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await eventService.createNewEvent(eventData, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// GET USER EVENTS
export const getEvents = createAsyncThunk(
    'events/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await eventService.getEvents(token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// GET ALL EVENTS - [ public ]
export const getAllEvents = createAsyncThunk(
    'public/allEvents',
    async (lastDate, thunkAPI) => {
        try {
            return await eventService.getAllEvents(lastDate)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Get user Event
export const getEvent = createAsyncThunk(
    'events/get',
    async (eventId, thunkAPI) => {
        try {
            return await eventService.getEvent(eventId)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Get Search Event
export const getSearchEvents = createAsyncThunk(
    'public/search',
    async (q, thunkAPI) => {
        try {
            return await eventService.getSearchEvents(q)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Get Event Creator
export const getEventCreator = createAsyncThunk(
    'public/creator',
    async (uid, thunkAPI) => {
        try {
            return await eventService.getEventCreator(uid)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// EVENT UPDATES
export const eventUpdates = createAsyncThunk(
    'events/updates',
    async (eventData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await eventService.eventUpdates(eventData, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Delete user Event
export const deleteEvent = createAsyncThunk(
    'events/delete',
    async (eventId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await eventService.deleteEvent(eventId, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// cancel an event
export const cancelEvent = createAsyncThunk(
    'events/cancel',
    async (eventId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await eventService.cancelEvent(eventId, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// get category events
export const getCategoryEvents = createAsyncThunk(
    'public/category',
    async (q, thunkAPI) => {
        try {
            return await eventService.getCategoryEvents(q)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => {
                // NOTE: clear single event on events page, this replaces need for loading state on individual event
                state.event = null
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.events = action.payload
            })
            .addCase(getCategoryEvents.fulfilled, (state, action) => {
                state.categoryEvents = action.payload
            })
            .addCase(getSearchEvents.fulfilled, (state, action) => {
                state.searchEvents = action.payload
            })
            .addCase(getEvent.fulfilled, (state, action) => {
                state.event = action.payload
            })
            .addCase(getAllEvents.fulfilled, (state, action) => {
                state.allEvents = action.payload.events
                state.lastEventDate = action.payload.lastEventDate
                state.eventsLength = action.payload.length
            })
            .addCase(eventUpdates.fulfilled, (state, action) => {
                state.event = action.payload
            })
            .addCase(cancelEvent.fulfilled, (state, action) => {
                state.event = action.payload
                state.events = state.events.map((event) =>
                    event._id === action.payload._id ? action.payload : event
                )
            })
    },
})

export default eventSlice.reducer