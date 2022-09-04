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
  roomsRequestStatus: RequestStatus.Idle,
  activeRoomData: null,
  activeRoomRequestStatus: RequestStatus.Idle,
  nearRoomData: [],
  nearRoomRequestStatus: RequestStatus.Idle,
};

export const roomsSlice = createSlice({
  name: NameSpace.Rooms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.roomsRequestStatus = RequestStatus.Success;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.roomsRequestStatus = RequestStatus.Error;
      })
      .addCase(fetchRooms.pending, (state) => {
        state.roomsRequestStatus = RequestStatus.Request;
      })
      .addCase(fetchActiveRoom.fulfilled, (state, action) => {
        state.activeRoomRequestStatus = RequestStatus.Success;
        state.activeRoomData = action.payload;
      })
      .addCase(fetchActiveRoom.rejected, (state) => {
        state.activeRoomRequestStatus = RequestStatus.Error;
      })
      .addCase(fetchActiveRoom.pending, (state) => {
        state.activeRoomRequestStatus = RequestStatus.Request;
      })
      .addCase(fetchNearRooms.fulfilled, (state, action) => {
        state.nearRoomRequestStatus = RequestStatus.Success;
        state.nearRoomData = action.payload;
      })
      .addCase(fetchNearRooms.rejected, (state) => {
        state.nearRoomRequestStatus = RequestStatus.Error;
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
