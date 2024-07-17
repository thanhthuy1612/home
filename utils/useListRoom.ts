import {
  updateIsInitLoadingListRoom,
  updateIsLoadingListRoom,
  updateListRoom,
  updateTotalListRoom,
} from '../lib/features/listRoom';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import handlePosts from '@/app/api/HandPosts';

export const useListRoom = () => {
  const count = 3;
  const dispatch = useAppDispatch();
  const { listRoom } = useAppSelector((state) => state.listRoom);

  const fetchData = async (isFirst?: boolean) => {
    dispatch(updateIsLoadingListRoom(true));
    const res = await handlePosts.getListPosts({
      index: 0,
      size: 0,
      address: '',
      priceFrom: 0,
      priceTo: 0,
      maxPeople: 0,
      roomType: 1,
      priceDescending: true,
    });
    dispatch(updateIsInitLoadingListRoom(false));
    dispatch(updateIsLoadingListRoom(false));
    dispatch(
      updateListRoom(isFirst ? res?.values : [...listRoom, ...res?.values]),
    );
    dispatch(updateTotalListRoom(res?.total));
  };

  return { fetchData };
};
