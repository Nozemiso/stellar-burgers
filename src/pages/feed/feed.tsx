import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import store, { useDispatch, useSelector } from '../../services/store';
import { loadFeed } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const isLoading = useSelector((store) => store.feedSlice.isLoading);
  const orders = useSelector((store) => store.feedSlice.orders) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFeed());
  }, []);

  if (isLoading) {
    return <Preloader />;
  } else
    return (
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(loadFeed())} />
    );
};
