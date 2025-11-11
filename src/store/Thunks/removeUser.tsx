import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user : any) => {
  const response = await axios.delete(`http://localhost:3005/users/${user.id}`);

  // Simulate network delay (ONLY FOR DEV)
  await pause(1000);

  return response.data;
});

// Simulate network delay (ONLY FOR DEV)
const pause = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export { removeUser };
