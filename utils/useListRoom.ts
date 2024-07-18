import {
  updateIsInitLoadingListRoom,
  updateIsLoadingListRoom,
  updateListRoom,
  updatePageNumberListRoom,
  updateTotalListRoom,
} from '../lib/features/listRoom';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import handlePosts from '@/app/api/HandPosts';
import { defaultPageSize } from './utils';
import { IStatusCode } from '@/interface/IStatusCode';

export const useListRoom = () => {
  const dispatch = useAppDispatch();
  const { listRoom, pageNumberListRoom } = useAppSelector(
    (state) => state.listRoom,
  );

  const fetchData = async (isFirst?: boolean) => {
    dispatch(updateIsLoadingListRoom(true));
    const res = await handlePosts.getListPosts({
      index: isFirst ? 1 : pageNumberListRoom,
      size: defaultPageSize,
      address: '',
      priceFrom: 0,
      priceTo: 0,
      maxPeople: 0,
      roomType: 1,
      priceDescending: true,
    });
    if (res?.status === IStatusCode.SUCCESS) {
      dispatch(
        updateListRoom(
          isFirst ? res.data?.values : [...listRoom, ...res.data?.values],
        ),
      );
      dispatch(updateTotalListRoom(res.data?.total));
      dispatch(updatePageNumberListRoom(isFirst ? 2 : pageNumberListRoom + 1));
    }
    dispatch(updateIsInitLoadingListRoom(false));
    dispatch(updateIsLoadingListRoom(false));
  };

  const fetchDataPostMe = async (isFirst?: boolean) => {
    dispatch(updateIsLoadingListRoom(true));
    const res = await handlePosts.getMePosts({
      index: isFirst ? 1 : pageNumberListRoom,
      size: defaultPageSize,
    });
    if (res?.status === IStatusCode.SUCCESS) {
      dispatch(
        updateListRoom(
          isFirst ? res.data?.values : [...listRoom, ...res.data?.values],
        ),
      );
      dispatch(updateTotalListRoom(res.data?.total));
      dispatch(updatePageNumberListRoom(isFirst ? 2 : pageNumberListRoom + 1));
    }
    dispatch(updateIsInitLoadingListRoom(false));
    dispatch(updateIsLoadingListRoom(false));
  };

  return { fetchData, fetchDataPostMe };
};
