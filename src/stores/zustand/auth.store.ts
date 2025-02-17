import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createSelectors } from './create.selectors';

export type TLogin = {
  email: string;
  password: string;
};

type TAuthState = {
  isLoading: boolean;
  user: any;
};

type TAuthAction = {
  login: (body: TLogin) => Promise<void>;
};

export type TAuthSlice = TAuthState & TAuthAction;

const initialState: TAuthState = {
  isLoading: false,
  user: null
};

const createAuthSlice: StateCreator<
  TAuthSlice,
  [
    ['zustand/devtools', unknown],
    ['zustand/immer', never],
    ['zustand/subscribeWithSelector', never],
    ['zustand/persist', unknown]
  ]
> = (set, _get) => ({
  ...initialState,
  login: async (_body: TLogin) => {
    // const res = await authService.login(body);
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1').then((data) => data.json());
    set((state) => {
      state.user = res;
    });
  }
});

export const useAuthStore = createSelectors(
  create<TAuthSlice>()(
    devtools(
      immer(
        subscribeWithSelector(
          persist(createAuthSlice, {
            name: 'auth-store',
            storage: createJSONStorage(() => sessionStorage)
          })
        )
      ),
      {
        enabled: true,
        name: 'Auth Store',
        anonymousActionType: 'AUTH_ACTION'
      }
    )
  )
);
