import { createReducer } from '@reduxjs/toolkit';
import { rooms } from '../mock/room';
import { changeCity, changeSortType } from './action';

const initialState = {
  city: 'Paris',
  rooms: rooms,
  sortType: 'Popular',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const city = action.payload;
      state.city = city;
    })
    .addCase(changeSortType, (state, action) => {
      const sortType = action.payload;
      state.sortType = sortType;
    });
});

export {reducer};
