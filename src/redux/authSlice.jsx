import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { email, password } = action.payload;

      const users = [
        {email: "admin@gmail.com", password: "admin", role: "admin"},
        { email: "anil@gmail.com", password: "1234", role: "regular-user" },
        { email: "eranna@gmail.com", password: "5678", role: "regular-user" },
      ];

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        state.isAuthenticated = true;
        state.user = user;
        state.error = null;
      } else {
        state.error = "Invalid  email or password";
      }
    },
    
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
