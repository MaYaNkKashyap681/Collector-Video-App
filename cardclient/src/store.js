import { configureStore } from '@reduxjs/toolkit';
import bucketReducer from './sllices/bucketSlice'
const store = configureStore({
    reducer: {
      bucket: bucketReducer
    },
});

export default store;