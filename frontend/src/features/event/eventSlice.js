import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventService from './eventService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../util'


// NOTE: no need for isLoading, isSuccess, isError or message as we can leverage
// our AsyncThunkAction and get Promise reolved or rejected messages at
// component level
const initialState = {
    events: null,
    event: null,
}


// CREATE NEW EVENT
export const createEvent = createAsyncThunk(
    'event/create',
    async (eventData, thunkAPI) => {
        try {
            // 'thunkAPI' has a '.getState()' method
            // which you can use to get anything else
            // from other states. Like we're in EventSlice now, but with this mthd we can access the states in authSlice or even globalSlice
            //  so with this we get the 'auth' reducer and access 'user' state to get the user's token
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


// Get user Event
export const getEvent = createAsyncThunk(
    'events/get',
    async (eventId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await eventService.getEvent(eventId, token)
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

// NOTE: removed loading, isSuccess state as it can be infered from presence or
// absence of events for simpler state management with no need for a reset function in reducers

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
            .addCase(getEvent.fulfilled, (state, action) => {
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
// 1ST:: then bring in eventSlice.reducer to the store.js