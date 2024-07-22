import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface IContactData {
  title: string;
  Icon: ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>
  >;
  content?: string;
  onClick?: () => void;
}
export interface IContact {
  data: IContactData[];
}
const initialState: IContact = {
  data: [],
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateContact: (state, action: PayloadAction<IContactData[]>) => {
      state.data = action.payload;
    },
    resetStateContact: () => initialState,
  },
});

export default contactSlice.reducer;

export const { resetStateContact, updateContact } = contactSlice.actions;
