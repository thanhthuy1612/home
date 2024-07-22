import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from './features/notification';
import reloadSlice from './features/reload';
import loginSlice from './features/login';
import userSlice from './features/user';
import listRoomSlice from './features/listRoom';
import listUserSlice from './features/listUser';
import contactSlice from './features/contact';

export const makeStore = () => {
  return configureStore({
    reducer: {
      notification: notificationSlice,
      reload: reloadSlice,
      login: loginSlice,
      user: userSlice,
      listRoom: listRoomSlice,
      listUser: listUserSlice,
      contact: contactSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
