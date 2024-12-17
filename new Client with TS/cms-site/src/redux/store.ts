import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice"

export const store = configureStore({
    reducer: {appReducer}
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;