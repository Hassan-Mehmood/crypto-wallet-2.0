import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SearchCoin } from '../types';

interface coinSliceType {
  id: string | null;
  name: string | null;
  api_symbol: string | null;
  symbol: string | null;
  market_cap_rank: number | null;
  thumb: string | null;
  large: string | null;
}

const initialState: coinSliceType = {
  id: null,
  name: null,
  api_symbol: null,
  symbol: null,
  market_cap_rank: null,
  thumb: null,
  large: null,
};

export const coinSlice = createSlice({
  name: 'searchCoin',
  initialState,
  reducers: {
    addCoin: (state, action: PayloadAction<SearchCoin>) => {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        api_symbol: action.payload.api_symbol,
        symbol: action.payload.symbol,
        market_cap_rank: action.payload.market_cap_rank,
        thumb: action.payload.thumb,
        large: action.payload.large,
      };
    },
    removeCoin: (state) => {
      return {
        ...state,
        id: null,
        name: null,
        api_symbol: null,
        symbol: null,
        market_cap_rank: null,
        thumb: null,
        large: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCoin, removeCoin } = coinSlice.actions;

export default coinSlice.reducer;
