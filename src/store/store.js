import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "../features/authenticationSlice/authenticationSlice";
import blogSlice from "../features/blogSlice/blogSlice"


export const store = configureStore({

    reducer:{
        authentication: authenticationSlice,
        blog: blogSlice
    }
})