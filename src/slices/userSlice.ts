import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  userData: TUser | null;
  error: string;
  orders: TOrder[];
};

const initialState: TUserState = {
  isAuthChecked: false,
  userData: null,
  error: '',
  orders: []
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {})
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = 'Неверный E-mail или пароль';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.error = '';
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })

      .addCase(getUser.rejected, (state, action) => {})
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })

      .addCase(logout.rejected, (state, action) => {})
      .addCase(logout.fulfilled, (state, action) => {
        Object.assign(state, initialState);
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })

      .addCase(getOrders.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userData = action.payload.user;
      });
  }
});

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const logout = createAsyncThunk('user/logout', logoutApi);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const getOrders = createAsyncThunk('user/getOrders', getOrdersApi);

export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
