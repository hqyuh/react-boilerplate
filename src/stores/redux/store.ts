import type { Reducer } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import authReducer from './auth/auth.slice';

const storeReducer = combineReducers({
  authReducer
});

const RESET_STATE_ACTION = 'reset';

export type TRootState = ReturnType<typeof storeReducer>;

const rootReducer: Reducer = (state: TRootState, action) => {
  if (action.type === RESET_STATE_ACTION) {
    state = {} as TRootState;
  }

  return storeReducer(state, action);
};

export const resetStoreAction = () => ({
  type: RESET_STATE_ACTION
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: (import.meta.env.MODE || import.meta.env.NODE_ENV) !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
