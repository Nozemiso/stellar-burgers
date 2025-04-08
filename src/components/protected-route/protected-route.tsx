import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.userData);

  if (!user && !onlyUnAuth) return <Navigate replace to={'/login'} />;
  if (user && onlyUnAuth) return <Navigate replace to={'/'} />;
  return children;
};
