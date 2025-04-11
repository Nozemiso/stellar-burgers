import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderByNumberApi } from '@api';
import { navigate } from '@storybook/addon-links';

export const OrderInfo: FC = () => {
  const number = useParams().number;
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getOrderByNumberApi(Number.parseInt(number || '0')).then((res) => {
      if (res.orders[0]) setOrderData(res.orders[0]);
      else navigate('/not-found');
    });
  }, []);

  const ingredients: TIngredient[] = useSelector(
    (store) => store.ingredientsSlice.ingredients
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    console.log({
      ...orderData,
      ingredientsInfo,
      date,
      total
    });

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
