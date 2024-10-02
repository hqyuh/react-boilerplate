import { createSlice } from '@reduxjs/toolkit';

import { loginAsync } from './auth.dispatcher';

const initialState = {
  user: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    });
  }
});

const { reducer: authReducer } = authSlice;
export default authReducer;
