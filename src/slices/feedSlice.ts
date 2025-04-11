import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { getFeedsApi, getIngredientsApi, getOrdersApi } from '@api';

type TFeedState = {
  total: number;
  totalToday: number;
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: TFeedState = {
  total: 0,
  totalToday: 0,
  orders: [],
  isLoading: true
};

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeed.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadFeed.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      });
  }
});

export const loadFeed = createAsyncThunk(
  'feedSlice/loadFeed',
  async () => await getFeedsApi()
);
