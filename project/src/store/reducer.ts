import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, RoomRequestStatus } from '../const';
import { rooms } from '../mock/room';
import { RoomType } from '../types/room';
import {
  changeCity,
  changeSortType,
  loadRoomsData,
  loadRoomsFailure,
  loadRoomsRequest,
  requireAuthorization,
} from './action';

type InitialState = {
  city: string,
  rooms: RoomType[],
  sortType: string,
  roomRequestStatus: RoomRequestStatus
  authorizationStatus: AuthorizationStatus
};

const initialState: InitialState = {
  city: 'Paris',
  rooms,
  sortType: 'Popular',
  roomRequestStatus: RoomRequestStatus.idle,
  authorizationStatus: AuthorizationStatus.Unknown,
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
      state.roomRequestStatus = RoomRequestStatus.success;
    })
    .addCase(loadRoomsRequest, (state) => {
      state.roomRequestStatus = RoomRequestStatus.request;
    })
    .addCase(loadRoomsFailure, (state) => {
      state.roomRequestStatus = RoomRequestStatus.error;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
