import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await axios.get("http://localhost:3005/users");

    // Simulate network delay (ONLY FOR DEV)
    // await pause (1000)

    return response.data

});

// Simulate network delay (ONLY FOR DEV)
// const pause = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export { fetchUsers }