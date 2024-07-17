import { AxiosResponse } from 'axios';
import { IStatusCode } from '../interface/IStatusCode';
import { updateNotification } from '../lib/features/notification';
import { useAppDispatch } from '../lib/hooks';

export const useNotification = () => {
  const dispatch = useAppDispatch();
  const setNotification = (
    result: AxiosResponse<any, any>,
    description: string,
    action: () => void,
  ) => {
    if (result.status === IStatusCode.SUCCESS) {
      action();
      dispatch(
        updateNotification({
          type: 'success',
          description: description,
        }),
      );
    }
    if (result.status === IStatusCode.ERROR) {
      dispatch(
        updateNotification({
          type: 'fail',
          description: result.data,
        }),
      );
    }
  };
  return { setNotification };
};
