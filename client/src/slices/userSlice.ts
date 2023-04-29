import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  name: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state = action.payload;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions;

export default userSlice.reducer;
