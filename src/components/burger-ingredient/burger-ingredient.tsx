import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import store, { useDispatch } from '../../services/store';
import { rootReducer } from '../../services/rootReducer';
import { constructorSlice } from '../../slices/constructorSlice';
import { v4 } from 'uuid';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun')
        dispatch(constructorSlice.actions.setBuns(ingredient));
      else
        dispatch(
          constructorSlice.actions.addIngredient({ ...ingredient, id: v4() })
        );
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
