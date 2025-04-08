import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { getOrders } from './userSlice';

type TBurgerEditorSlice = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  orderAvailable: boolean;
};

export const initialState: TBurgerEditorSlice = {
  bun: null,
  ingredients: [],
  orderAvailable: true
};

export const constructorSlice = createSlice({
  name: 'burgerEditorSlice',
  initialState: initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.splice(state.ingredients.indexOf(action.payload), 1);
    },
    setBuns(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload.type == 'bun' ? action.payload : state.bun;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state, action) => {
        state.orderAvailable = false;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderAvailable = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        Object.assign(state, initialState);
      });
  }
});

export const orderBurger = createAsyncThunk(
  'burgerEditor/orderBurger',
  orderBurgerApi
);
