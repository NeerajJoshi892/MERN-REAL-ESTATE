import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import storage from 'redux-persist/lib/storage'; // Correct import path for redux-persist storage
import { persistReducer, persistStore } from 'redux-persist';

// Combine your reducers
const rootReducer = combineReducers({ user: userReducer });

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1, // Specify a version number
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with the persisted reducer and disable serializableCheck
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create and export the persistor
export const persistor = persistStore(store);
