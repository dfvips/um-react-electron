import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import fileListingReducer from './features/file-listing/fileListingSlice';
import settingsReducer from './features/settings/settingsSlice';

const rootReducer = combineReducers({
  fileListing: fileListingReducer,
  settings: settingsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
