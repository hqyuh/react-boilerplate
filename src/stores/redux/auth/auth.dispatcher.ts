import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../../services/auth.service';
import type { TLogin } from './auth.type';
import { EActionAuth } from './auth.type';

const loginAsync = createAsyncThunk(EActionAuth.LOGIN, async (arg: TLogin, { rejectWithValue }) => {
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
