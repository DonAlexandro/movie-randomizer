import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { movieAPI } from '../api/movie-api';

const rootReducer = combineReducers({
  [movieAPI.reducerPath]: movieAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(movieAPI.middleware);
    }
  });
};
