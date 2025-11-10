import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    name: faker.person.fullName(),
  });

  // Simulate network delay (ONLY FOR DEV)
  await pause(1000);

  return response.data;
});

// Simulate network delay (ONLY FOR DEV)
const pause = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export { addUser }