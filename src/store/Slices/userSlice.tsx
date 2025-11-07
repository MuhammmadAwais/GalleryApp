import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../Thunks/fetchUsers";
import type { SerializedError } from "../../Types/errorTypes";


interface UserState {
  data: any[]; 
  isLoading: boolean;
  error: SerializedError | null; 
}


const initialState: UserState = {
  data: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as SerializedError | null;
      });
  },
});

export const userReducer = userSlice.reducer;
