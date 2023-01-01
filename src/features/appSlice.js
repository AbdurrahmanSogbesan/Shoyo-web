import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = appSlice.actions;

export const selectUser = (state) => {
  return {
    type: "SELECT_USER",
    payload: state.app.user,
  };
};

export default appSlice.reducer;
