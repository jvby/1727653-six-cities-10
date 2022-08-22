import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestStatus} from '../../const';
import {RoomProcess} from '../../types/store';
import { fetchActiveRoom, fetchNearRooms, fetchRooms } from '../api-actions';

const initialState: RoomProcess = {
  rooms: null,
  roomsRequestStatus: RequestStatus.idle,
  activeRoomData: null,
  activeRoomRequestStatus: RequestStatus.idle,
  nearRoomData: null,
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
