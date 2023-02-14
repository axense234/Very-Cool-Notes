// Store
import { configureStore } from "@reduxjs/toolkit";
// Reducers
import authorsSliceReducer from "../slices/authorsSlice";
import generalSliceReducer from "../slices/generalSlice";
import foldersSliceReducer from "../slices/foldersSlice";
import notesSliceReducer from "../slices/notesSlice";
import categoriesSliceReducer from "../slices/categoriesSlice";

const store = configureStore({
  reducer: {
    authors: authorsSliceReducer,
    general: generalSliceReducer,
    folders: foldersSliceReducer,
    notes: notesSliceReducer,
    categories: categoriesSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
