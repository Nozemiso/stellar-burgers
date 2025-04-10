import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { loadIngredients } from '../../slices/ingredientsSlice';
import { getUser } from '../../slices/userSlice';
import { Preloader } from '@ui';

function AppRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route path='*' element={<NotFound404 />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              stretched
              title={'Детали ингредиента'}
              onClose={() => {
                navigate(-1);
              }}
              children={<IngredientDetails />}
            />
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal
              stretched
              title=''
              titleParamName='number'
              onClose={() => {
                navigate(-1);
              }}
              children={<OrderInfo />}
            />
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => {
                  navigate(-1);
                }}
                children={<IngredientDetails />}
              />
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title=''
                titleParamName='number'
                onClose={() => {
                  navigate(-1);
                }}
                children={<OrderInfo />}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title=''
                titleParamName='number'
                onClose={() => {
                  navigate(-1);
                }}
                children={<OrderInfo />}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.userSlice.isAuthChecked);

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(getUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {isAuthChecked ? <AppRouter /> : <Preloader />}
    </div>
  );
};

export default App;
