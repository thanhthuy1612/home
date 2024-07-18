import { ISelected } from '@/interface/ISelected';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DataType {
  id: string;
  title: string;
  description: string;
  previewPicture: string;
  address: string;
  maxPeople: number;
  price: number;
  roomType: number;
  roomStatus: number;
  postsStatus: 1;
  updatedTime: Date;
}

export interface ListRoomState {
  cost?: string;
  array?: string;
  type?: string;
  searchValue: string;
  maxPeople: number | undefined | null;
  isLoadingListFilter: boolean;
  isInitLoadingListRoom: boolean;
  isLoadingListRoom: boolean;
  listRoom: DataType[];
  totalListRoom: number;
  pageNumberListRoom: number;
}

const initialState: ListRoomState = {
  cost: undefined,
  array: '0',
  type: '1',
  isLoadingListFilter: false,
  searchValue: '',
  maxPeople: undefined,
  isInitLoadingListRoom: true,
  isLoadingListRoom: true,
  listRoom: [],
  totalListRoom: 0,
  pageNumberListRoom: 1,
};

export const listRoomSlice = createSlice({
  name: 'listRoom',
  initialState,
  reducers: {
    updateCost: (state, action: PayloadAction<string | undefined>) => {
      state.cost = action.payload;
    },
    updateArray: (state, action: PayloadAction<string | undefined>) => {
      state.array = action.payload;
    },
    updateType: (state, action: PayloadAction<string | undefined>) => {
      state.type = action.payload;
    },
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    updateMaxPeople: (state, action: PayloadAction<number | null>) => {
      state.maxPeople = action.payload;
    },
    updateIsLoadingListFilter: (state, action: PayloadAction<boolean>) => {
      state.isLoadingListFilter = action.payload;
    },
    updateIsInitLoadingListRoom: (state, action: PayloadAction<boolean>) => {
      state.isInitLoadingListRoom = action.payload;
    },
    updateIsLoadingListRoom: (state, action: PayloadAction<boolean>) => {
      state.isLoadingListRoom = action.payload;
    },
    updateListRoom: (state, action: PayloadAction<DataType[]>) => {
      state.listRoom = action.payload;
    },
    updateTotalListRoom: (state, action: PayloadAction<number>) => {
      state.totalListRoom = action.payload;
    },
    updatePageNumberListRoom: (state, action: PayloadAction<number>) => {
      state.pageNumberListRoom = action.payload;
    },
    resetStateListRoom: () => initialState,
  },
});

export default listRoomSlice.reducer;

export const {
  updateCost,
  updateArray,
  updateType,
  updateSearchValue,
  updateMaxPeople,
  updateIsLoadingListFilter,
  updateIsInitLoadingListRoom,
  updateIsLoadingListRoom,
  updateListRoom,
  updateTotalListRoom,
  resetStateListRoom,
  updatePageNumberListRoom,
} = listRoomSlice.actions;
