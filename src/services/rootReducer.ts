import { combineReducers } from '@reduxjs/toolkit';

import { ingredientsSlice } from '../slices/ingredientsSlice';
import { constructorSlice } from '../slices/constructorSlice';
import { feedSlice } from '../slices/feedSlice';
import { userSlice } from '../slices/userSlice';

export const rootReducer = combineReducers({
  ingredientsSlice: ingredientsSlice.reducer,
  constructorSlice: constructorSlice.reducer,
  feedSlice: feedSlice.reducer,
  userSlice: userSlice.reducer
});
