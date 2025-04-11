import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getUser } from '../../slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { constructorSlice, orderBurger } from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((state) => state.constructorSlice);
  const orderRequest = useSelector(
    (state) => !state.constructorSlice.orderAvailable
  );
  const orderModalData = useSelector(
    (state) => state.constructorSlice.orderResult
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user.userData) {
      navigate('/login', { replace: true });
    } else
      dispatch(
        orderBurger([
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((ing) => ing._id),
          constructorItems.bun._id
        ])
      );
  };
  const closeOrderModal = () => {
    dispatch(constructorSlice.actions.clearResult());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
