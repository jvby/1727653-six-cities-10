import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestStatus} from '../../const';
import { RoomType } from '../../types/room';
import { changeFavoriteOption, fetchActiveRoom, fetchNearRooms, fetchRooms } from '../api-actions';

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

export const roomsSlice = createSlice({
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
      .addCase(changeFavoriteOption.fulfilled, (state, action) => {
        if (state.activeRoomData !== null && state.activeRoomData.id === action.payload.id) {
          state.activeRoomData = action.payload;
        }
        state.rooms = state.rooms.map((room) => {
          if (room.id === action.payload.id) {
            return action.payload;
          } else {
            return room;
          }
        });
        state.nearRoomData = state.nearRoomData.map((room) => {
          if (room.id === action.payload.id) {
            return action.payload;
          } else {
            return room;
          }
        });
      });
  }
});
