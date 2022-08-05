import { createReducer } from '@reduxjs/toolkit';
import { rooms } from '../mock/room';
import { changeCity } from './action';

const initialState = {
  city: 'Paris',
  rooms: rooms,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const city = action.payload;
      state.city = city;
    });
});

export {reducer};
