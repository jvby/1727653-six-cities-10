import { createReducer } from '@reduxjs/toolkit';
import { rooms } from '../mock/room';
import { changeCity, updatePropertyList } from './action';

const initialState = {
  city: 'Paris',
  rooms: rooms,
  filtredRooms: rooms.filter((room) => room.city.name === 'Paris'),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const city = action.payload;
      state.city = city;
    })
    .addCase(updatePropertyList, (state, action) => {
      const actualRooms = action.payload;
      state.filtredRooms = actualRooms;
    });
});

export {reducer};
