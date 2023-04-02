import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  data: [],
  status: STATUSES.IDLE,
};

export const bucketSlice = createSlice({
  name: "bucket",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuckets.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchBuckets.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchBuckets.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default bucketSlice.reducer;
export const buckets = (state) => state.bucket.data;
export const status = (state) => state.bucket.status;

export const fetchBuckets = createAsyncThunk("buckets/fetch", async () => {
  const res = await fetch("http://localhost:3000/bucket/all");
  const data = await res.json();
  const arr = [];
  for (let i = 0; i < data.length; ++i) {
    arr.push({ id: data[i]["_id"], name: data[i]["bname"] });
  }
  localStorage.setItem("buckets", JSON.stringify(arr));
  return data;
});
