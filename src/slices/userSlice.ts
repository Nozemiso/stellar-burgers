import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {})
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = 'Неверный E-mail или пароль';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.error = '';
      })

      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userData = action.payload.user;
      })

      .addCase(logout.rejected, (state, action) => {})
      .addCase(logout.fulfilled, (state, action) => {
        Object.assign(state, initialState);
        state.isAuthChecked = true;
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
        state.userData = action.payload.user;
      });
  }
});

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const logout = createAsyncThunk('user/logout', (_, thunkAPI) =>
  logoutApi()
    .catch((res) => Promise.reject(thunkAPI.rejectWithValue(res)))
    .then((res) => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return res;
    })
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, thunkAPI) =>
    registerUserApi(data)
      .catch((res) => Promise.reject(thunkAPI.rejectWithValue(res)))
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        return res;
      })
);

export const getOrders = createAsyncThunk('user/getOrders', getOrdersApi);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  (data: TLoginData, thunkAPI) =>
    loginUserApi(data)
      .catch((res) => Promise.reject(thunkAPI.rejectWithValue(res)))
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        return res;
      })
);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
