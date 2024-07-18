import { AxiosResponse } from 'axios';
import { IStatusCode } from '../interface/IStatusCode';
import { updateNotification } from '../lib/features/notification';
import { useAppDispatch } from '../lib/hooks';
import { error } from 'console';

export const useNotification = () => {
  const dispatch = useAppDispatch();
  const setNotification = (
    result: AxiosResponse<any, any>,
    description: string,
    action: () => void,
    error?: string,
  ) => {
    if (result?.status === IStatusCode.SUCCESS) {
      action();
      dispatch(
        updateNotification({
          type: 'success',
          description: description,
        }),
      );
    } else {
      dispatch(
        updateNotification({
          type: 'fail',
          description: error ?? '',
        }),
      );
    }
  };

  const setErrorMessage = (title: string) => {
    dispatch(
      updateNotification({
        type: 'fail',
        description: title,
      }),
    );
  };
  return { setNotification, setErrorMessage };
};
