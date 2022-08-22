import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {UserInterfaceProcess} from '../../types/store';

const initialState: UserInterfaceProcess = {
  city: 'Paris',
  sortType: 'Popular',
  activeRoomOnMap: null,
};

export const userInterfaceProcess = createSlice({
  name: NameSpace.UI,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      const city = action.payload;
      state.city = city;
    },
    changeSortType: (state, action) => {
      const sortType = action.payload;
      state.sortType = sortType;
    },
    changeActiveRoomOnMap: (state, action) => {
      state.activeRoomOnMap = action.payload;
    }
  },
});

export const {changeCity, changeSortType, changeActiveRoomOnMap} = userInterfaceProcess.actions;
