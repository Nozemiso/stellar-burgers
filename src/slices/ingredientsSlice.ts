import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: true
};

export const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      });
  }
});

export const loadIngredients = createAsyncThunk(
  'ingredient/fetchIngredients',
  async () => await getIngredientsApi()
);
