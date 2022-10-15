import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    snackbarMessage: ''
}

// create globalSlice
export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        snack: (state, action) => {
            state.snackbarMessage = action.payload
        },
        resetSnackbar: (state) => {
            state.snackbarMessage = ''
        }
    }
})

export const { snack, resetSnackbar } = globalSlice.actions

export default globalSlice.reducer