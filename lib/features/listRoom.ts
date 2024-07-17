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
  location?: string;
  type?: string;
  listCost: ISelected[];
  listLocation: ISelected[];
  listType: ISelected[];
  searchValue: string;
  isLoadingListFilter: boolean;
  isInitLoadingListRoom: boolean;
  isLoadingListRoom: boolean;
  listRoom: DataType[];
  totalListRoom: number;
}

const initialState: ListRoomState = {
  cost: undefined,
  location: undefined,
  type: undefined,
  listCost: [],
  listLocation: [],
  listType: [],
  isLoadingListFilter: false,
  searchValue: '',
  isInitLoadingListRoom: true,
  isLoadingListRoom: true,
  listRoom: [],
  totalListRoom: 0,
};

export const listRoomSlice = createSlice({
  name: 'listRoom',
  initialState,
  reducers: {
    updateCost: (state, action: PayloadAction<string | undefined>) => {
      state.cost = action.payload;
    },
    updateLocation: (state, action: PayloadAction<string | undefined>) => {
      state.location = action.payload;
    },
    updateType: (state, action: PayloadAction<string | undefined>) => {
      state.type = action.payload;
    },
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    updateListCost: (state, action: PayloadAction<ISelected[]>) => {
      state.listCost = action.payload;
    },
    updateListLocation: (state, action: PayloadAction<ISelected[]>) => {
      state.listLocation = action.payload;
    },
    updateListType: (state, action: PayloadAction<ISelected[]>) => {
      state.listType = action.payload;
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
    resetStateListRoom: () => initialState,
  },
});

export default listRoomSlice.reducer;

export const {
  updateCost,
  updateLocation,
  updateType,
  updateSearchValue,
  updateListCost,
  updateListLocation,
  updateListType,
  updateIsLoadingListFilter,
  updateIsInitLoadingListRoom,
  updateIsLoadingListRoom,
  updateListRoom,
  updateTotalListRoom,
  resetStateListRoom,
} = listRoomSlice.actions;
