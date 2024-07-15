import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LoginState {
  isLoadingForm: boolean;
  isLoadingConnect: boolean;
  width: number;
}

const initialState: LoginState = {
  isLoadingForm: false,
  isLoadingConnect: false,
  width: 0,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateIsLoadingForm: (state, action: PayloadAction<boolean>) => {
      state.isLoadingForm = action.payload;
    },
    updateIsLoadingConnect: (state, action: PayloadAction<boolean>) => {
      state.isLoadingConnect = action.payload;
    },
    updateWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    resetStateLogin: () => initialState,
  },
});

export default loginSlice.reducer;

export const {
  updateIsLoadingForm,
  updateIsLoadingConnect,
  updateWidth,
  resetStateLogin,
} = loginSlice.actions;
