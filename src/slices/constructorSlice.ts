import { TIngredient, TOrder } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { getOrders } from './userSlice';

type TUniqueIngredient = {
  ingredient: TIngredient;
  uuid: string;
};

type TBurgerEditorSlice = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  orderAvailable: boolean;
  orderResult: TOrder | null;
};

export const initialState: TBurgerEditorSlice = {
  bun: null,
  ingredients: [],
  orderAvailable: true,
  orderResult: null
};

export const constructorSlice = createSlice({
  name: 'burgerEditorSlice',
  initialState: initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    setBuns(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload.type == 'bun' ? action.payload : state.bun;
    },
    swapUp(state, action: PayloadAction<number>) {
      const pos = action.payload;
      [state.ingredients[pos - 1], state.ingredients[pos]] = [
        state.ingredients[pos],
        state.ingredients[pos - 1]
      ];
    },
    swapDown(state, action: PayloadAction<number>) {
      const pos = action.payload;
      [state.ingredients[pos + 1], state.ingredients[pos]] = [
        state.ingredients[pos],
        state.ingredients[pos + 1]
      ];
    },
    clearResult(state) {
      state.orderResult = null;
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
        state.orderResult = action.payload.order;
      });
  }
});

export const orderBurger = createAsyncThunk(
  'burgerEditor/orderBurger',
  orderBurgerApi
);
