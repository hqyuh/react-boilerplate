import type { TRootState } from '../store';

export const selectAuth = (state: TRootState) => state.authReducer.user;
