import { updateIsInitLoadingListRoom, updateIsLoadingListRoom, updateListRoom, updateTotalListRoom } from '../lib/features/listRoom';
import { useAppDispatch, useAppSelector } from '../lib/hooks';

export const useListRoom = () => {
  const count = 3;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

  const dispatch = useAppDispatch();
  const { listRoom } = useAppSelector((state) => state.listRoom);

  const fetchData = async (isFirst?: boolean) => {
    dispatch(updateIsLoadingListRoom(true));
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        dispatch(updateIsInitLoadingListRoom(false));
        dispatch(updateIsLoadingListRoom(false));
        dispatch(updateListRoom(isFirst ? res.results : [...listRoom, ...res.results]));
        dispatch(updateTotalListRoom(100));
      });
  };

  return { fetchData };
};
