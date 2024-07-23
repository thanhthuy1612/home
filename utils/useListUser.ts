import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { defaultPageSize } from './utils';
import {
  updateIsInitLoadingListUser,
  updateIsLoadingListUser,
  updateListUser,
  updatePageNumberListUser,
  updateTotalListUser,
} from '@/lib/features/listUser';
import { IStatusCode } from '@/interface/IStatusCode';
import handleAdmin from '@/app/api/HandAdmin';

export const useListUser = () => {
  const dispatch = useAppDispatch();
  const { listUser, searchValue, pageNumberListUser } = useAppSelector(
    (state) => state.listUser,
  );

  const fetchDataUser = async (isFirst?: boolean) => {
    dispatch(updateIsLoadingListUser(true));
    if (isFirst) {
      dispatch(updateIsInitLoadingListUser(true));
      dispatch(updateTotalListUser(0));
      dispatch(updatePageNumberListUser(0));
      updateListUser([]);
    }
    const res = await handleAdmin.getListUserAdmin({
      index: isFirst ? 1 : pageNumberListUser,
      size: defaultPageSize,
      searchText: searchValue ?? null,
    });
    if (res?.status === IStatusCode.SUCCESS) {
      dispatch(
        updateListUser(
          isFirst ? res.data?.values : [...listUser, ...res.data?.values],
        ),
      );
      dispatch(updateTotalListUser(res.data?.total));
      dispatch(updatePageNumberListUser(isFirst ? 2 : pageNumberListUser + 1));
    }
    dispatch(updateIsInitLoadingListUser(false));
    dispatch(updateIsLoadingListUser(false));
  };
  return { fetchDataUser };
};
