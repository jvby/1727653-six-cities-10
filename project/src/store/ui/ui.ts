import {createSlice} from '@reduxjs/toolkit';
import {DefaultCity, NameSpace, SortingType} from '../../const';

export type UserInterface = {
  city: string,
  sortType: string,
};

const initialState: UserInterface = {
  city: DefaultCity.name,
  sortType: SortingType.Popular,
};

export const userInterfaceSlice = createSlice({
  name: NameSpace.UserInterface,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const {changeCity, changeSortType} = userInterfaceSlice.actions;
