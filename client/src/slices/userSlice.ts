import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  name: string;
  email: string;
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions;

export default userSlice.reducer;
