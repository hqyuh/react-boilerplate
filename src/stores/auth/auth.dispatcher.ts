import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from './auth.service';
import type { ILogin } from './auth.type';
import { EActionAuth } from './auth.type';

const loginAsync = createAsyncThunk(EActionAuth.LOGIN, async (arg: ILogin, { rejectWithValue }) => {
  try {
    const response = await authService.login(arg);

    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.data) {
        return rejectWithValue([{}]);
      }
    }
  }
});

export { loginAsync };
