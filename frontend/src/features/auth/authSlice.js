import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// register func
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            // fetch our data from the server
            return await authService.register(user)
        } catch (error) {
            const message =
                (error.message &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message || error.toString();

            return thunkAPI.rejectWithValue(message)
        }
    })

// Login func
export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        try {
            // verify user from server and return data
            return authService.login(user)
        } catch (error) {
            const message = (
                error.message &&
                error.response.data &&
                error.response.data.message) ||
                error.message || error.toString();

            return thunkAPI.rejectWithValue(message)
        }
    })

// logout func
export const logout = createAsyncThunk('auth/logout',
    async () => {
        await authService.logout()
    })


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.message = (action.error.message.includes('401')) ? (
                    'Invalid credentials provided'
                ) : (
                    'We encountered an error, please try again'
                );
                state.isError = true
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer