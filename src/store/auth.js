import { createSlice } from "@reduxjs/toolkit";

///state changes in response to actions. Here, there are two reducers:
///login: Sets isLoggedIn to true.
///logout: Sets isLoggedIn to false.
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
