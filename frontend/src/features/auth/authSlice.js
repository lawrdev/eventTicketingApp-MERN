import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// register func
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            // 
            return await authService.register(user)
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message)
        }
    })
// Login func
export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        console.log(user)
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
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
                state.user = null
            })
    }
})

export default authSlice.reducer