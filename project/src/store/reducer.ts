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
  setLoginName,
} from './action';

type InitialState = {
  city: string,
  rooms: RoomType[],
  sortType: string,
  roomRequestStatus: RoomRequestStatus,
  authorizationStatus: AuthorizationStatus,
  loginName: string | null,
};

const initialState: InitialState = {
  city: 'Paris',
  rooms,
  sortType: 'Popular',
  roomRequestStatus: RoomRequestStatus.idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  loginName: null,
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
    })
    .addCase(setLoginName, (state, action) => {
      state.loginName = action.payload;
    });
});

export {reducer};
