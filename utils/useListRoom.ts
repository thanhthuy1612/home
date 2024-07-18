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
import handleAdmin from '@/app/api/HandAdmin';

export const useListRoom = () => {
  const dispatch = useAppDispatch();
  const {
    listRoom,
    pageNumberListRoom,
    searchValue,
    cost,
    maxPeople,
    type,
    array,
  } = useAppSelector((state) => state.listRoom);

  const fetchData = async (isFirst?: boolean) => {
    const checkCost: () => {
      priceFrom: number;
      priceTo: number;
    } = () => {
      switch (cost) {
        case '1':
          return { priceFrom: 0, priceTo: 3000000 };
        case '2':
          return { priceFrom: 3000000, priceTo: 5000000 };
        case '3':
          return { priceFrom: 5000000, priceTo: 7000000 };

        case '4':
          return { priceFrom: 7000000, priceTo: 7000000 };
        case '5':
          return { priceFrom: 10000000, priceTo: 1000000000000 };
        default:
          return { priceFrom: 0, priceTo: 0 };
      }
    };
    dispatch(updateIsLoadingListRoom(true));
    const res = await handlePosts.getListPosts({
      index: isFirst ? 1 : pageNumberListRoom,
      size: defaultPageSize,
      address: searchValue ?? '',
      ...checkCost(),
      maxPeople: maxPeople ?? 0,
      roomType: Number(type) ?? 0,
      priceDescending: Boolean(array === '0'),
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

  const fetchDataAdmin = async (ownerId: string, isFirst?: boolean) => {
    const checkCost: () => {
      priceFrom: number;
      priceTo: number;
    } = () => {
      switch (cost) {
        case '1':
          return { priceFrom: 0, priceTo: 3000000 };
        case '2':
          return { priceFrom: 3000000, priceTo: 5000000 };
        case '3':
          return { priceFrom: 5000000, priceTo: 7000000 };

        case '4':
          return { priceFrom: 7000000, priceTo: 7000000 };
        case '5':
          return { priceFrom: 10000000, priceTo: 1000000000000 };
        default:
          return { priceFrom: 0, priceTo: 0 };
      }
    };
    dispatch(updateIsLoadingListRoom(true));
    const res = await handleAdmin.getListPostAdmin({
      index: isFirst ? 1 : pageNumberListRoom,
      size: defaultPageSize,
      address: searchValue ?? '',
      ...checkCost(),
      maxPeople: maxPeople ?? 0,
      roomType: Number(type) ?? 0,
      ownerId: ownerId,
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

  return { fetchData, fetchDataPostMe, fetchDataAdmin };
};
