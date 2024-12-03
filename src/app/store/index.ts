import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import speakerReducer from './slices/speakerSlice';
import sponsorReducer from './slices/sponsorSlice';
import ticketReducer from './slices/ticketSlice';
import organiserReducer from './slices/organiserSlice';

export const store = configureStore({
  reducer: {
    organiser: organiserReducer,
    user: userReducer,
    speakers: speakerReducer,
    sponsors: sponsorReducer,
    tickets: ticketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;