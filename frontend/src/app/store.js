import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import globalReducer from '../features/global/globalSlice'
import eventReducer from '../features/event/eventSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    event: eventReducer,
  },
});
