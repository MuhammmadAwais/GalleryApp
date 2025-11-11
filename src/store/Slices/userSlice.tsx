import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../Thunks/fetchUsers";
import { addUser } from "../Thunks/addUser";
import { removeUser } from "../Thunks/removeUser";
import type { SerializedError } from "../../Types/errorTypes";


 export interface UserState {
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
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as SerializedError | null;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload.id);
      })
      .addCase(removeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.error as SerializedError | null;
      })

  },
});

export const userReducer = userSlice.reducer;
