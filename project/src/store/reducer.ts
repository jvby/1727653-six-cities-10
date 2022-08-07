import { createReducer } from '@reduxjs/toolkit';
import { rooms } from '../mock/room';
import { RoomType } from '../types/room';
import { changeCity, changeSortType, loadRoomsData, loadRoomsFailure, loadRoomsRequest } from './action';

type InitialState = {
  city: string,
  rooms: RoomType[],
  sortType: string,
  roomRequestStatus: 'idle' | 'request' | 'success' | 'error'
};

const initialState: InitialState = {
  city: 'Paris',
  rooms,
  sortType: 'Popular',
  roomRequestStatus: 'idle'
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
    })
    .addCase(loadRoomsData, (state, action) => {
      const roomsFromServer = action.payload;
      state.rooms = roomsFromServer;
      state.roomRequestStatus = 'success';
    })
    .addCase(loadRoomsRequest, (state) => {
      state.roomRequestStatus = 'request';
    })
    .addCase(loadRoomsFailure, (state) => {
      state.roomRequestStatus = 'error';
    });
});

export {reducer};
