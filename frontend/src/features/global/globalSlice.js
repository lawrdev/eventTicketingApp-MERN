import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSnackbarOpen: false,
    snackbarMessage: ''
}

// create globalSlice
export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        snack: (state, action) => {
            state.isSnackbarOpen = true
            state.snackbarMessage = action.payload
        },
        resetSnackbar: (state) => {
            state.isSnackbarOpen = false
            state.snackbarMessage = ''
        }
    }
})

export const { snack, resetSnackbar } = globalSlice.actions

export default globalSlice.reducer