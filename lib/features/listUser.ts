import { IListUser } from '@/interface/IListUser';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ListUserState {
  listUser: IListUser[];
  totalListUser: number;
  pageNumberListUser: number;
  searchValue: string;
  isLoadingListUser: boolean;
  isInitLoadingListUser: boolean;
}

const initialState: ListUserState = {
  listUser: [],
  totalListUser: 0,
  pageNumberListUser: 1,
  searchValue: '',
  isLoadingListUser: false,
  isInitLoadingListUser: true,
};

export const listUserSlice = createSlice({
  name: 'listUser',
  initialState,
  reducers: {
    updateListUser: (state, action: PayloadAction<IListUser[]>) => {
      state.listUser = action.payload;
    },
    updateTotalListUser: (state, action: PayloadAction<number>) => {
      state.totalListUser = action.payload;
    },
    updatePageNumberListUser: (state, action: PayloadAction<number>) => {
      state.pageNumberListUser = action.payload;
    },
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    updateIsLoadingListUser: (state, action: PayloadAction<boolean>) => {
      state.isLoadingListUser = action.payload;
    },
    updateIsInitLoadingListUser: (state, action: PayloadAction<boolean>) => {
      state.isInitLoadingListUser = action.payload;
    },
    resetStateListUser: () => initialState,
  },
});

export default listUserSlice.reducer;

export const {
  updateListUser,
  updateTotalListUser,
  updatePageNumberListUser,
  updateSearchValue,
  updateIsLoadingListUser,
  updateIsInitLoadingListUser,
  resetStateListUser,
} = listUserSlice.actions;
