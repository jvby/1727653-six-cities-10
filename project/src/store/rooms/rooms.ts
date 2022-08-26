import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestStatus} from '../../const';
import { RoomType } from '../../types/room';
import { fetchActiveRoom, fetchNearRooms, fetchRooms } from '../api-actions';

export type RoomsInitialState = {
  rooms: RoomType[],
  roomsRequestStatus: RequestStatus,
  activeRoomData: RoomType | null,
  activeRoomRequestStatus: RequestStatus,
  nearRoomData: RoomType[],
  nearRoomRequestStatus: RequestStatus,
};

const initialState: RoomsInitialState = {
  rooms: [],
  roomsRequestStatus: RequestStatus.idle,
  activeRoomData: null,
  activeRoomRequestStatus: RequestStatus.idle,
  nearRoomData: [],
  nearRoomRequestStatus: RequestStatus.idle,
};

export const roomProcess = createSlice({
  name: NameSpace.Rooms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.roomsRequestStatus = RequestStatus.success;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.roomsRequestStatus = RequestStatus.error;
      })
      .addCase(fetchRooms.pending, (state) => {
        state.roomsRequestStatus = RequestStatus.request;
      })
      .addCase(fetchActiveRoom.fulfilled, (state, action) => {
        state.activeRoomRequestStatus = RequestStatus.success;
        state.activeRoomData = action.payload;
      })
      .addCase(fetchActiveRoom.rejected, (state) => {
        state.activeRoomRequestStatus = RequestStatus.error;
      })
      .addCase(fetchActiveRoom.pending, (state) => {
        state.activeRoomRequestStatus = RequestStatus.request;
      })
      .addCase(fetchNearRooms.fulfilled, (state, action) => {
        state.nearRoomRequestStatus = RequestStatus.success;
        state.nearRoomData = action.payload;
      })
      .addCase(fetchNearRooms.rejected, (state) => {
        state.nearRoomRequestStatus = RequestStatus.error;
      })
      .addCase(fetchNearRooms.pending, (state) => {
        state.nearRoomRequestStatus = RequestStatus.request;
      });
  }
});
