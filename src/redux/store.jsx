import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import infraReducer from "./infraSlice.jsx";

const store = configureStore({
    reducer: {
        auth: authReducer,
        infra: infraReducer,
    },
});

export default store;