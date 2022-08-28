import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestStatus} from '../../const';
import { RoomType } from '../../types/room';
import { changeFavoriteOption, fetchActiveRoom, fetchFavoriteRooms, fetchNearRooms, fetchRooms, loginAction, logoutAction } from '../api-actions';

export type RoomsInitialState = {
  rooms: RoomType[],
  roomsRequestStatus: RequestStatus,
  activeRoomData: RoomType | null,
  activeRoomRequestStatus: RequestStatus,
  nearRoomData: RoomType[],
  nearRoomRequestStatus: RequestStatus,
  changeFavoriteRoomRequestStatus: RequestStatus,
  favoriteRooms: RoomType[],
  favoriteRoomsRequestStatus: RequestStatus,
};

const initialState: RoomsInitialState = {
  rooms: [],
  roomsRequestStatus: RequestStatus.idle,
  activeRoomData: null,
  activeRoomRequestStatus: RequestStatus.idle,
  nearRoomData: [],
  nearRoomRequestStatus: RequestStatus.idle,
  changeFavoriteRoomRequestStatus: RequestStatus.idle,
  favoriteRooms: [],
  favoriteRoomsRequestStatus: RequestStatus.idle,
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
      .addCase(changeFavoriteOption.fulfilled, (state, action) => {
        state.changeFavoriteRoomRequestStatus = RequestStatus.success;
        const indexOfRoom = state.rooms.findIndex((room) => room.id === action.payload.id);
        const indexOfNearRoom = state.nearRoomData.findIndex((room) => room.id === action.payload.id);
        const indexOfFavoriteRoom = state.favoriteRooms.findIndex((room) => room.id === action.payload.id);
        state.activeRoomData = action.payload;
        if (indexOfRoom !== -1) {
          state.rooms[indexOfRoom].isFavorite = action.payload.isFavorite;
        }
        if (indexOfNearRoom !== -1) {
          state.nearRoomData[indexOfRoom].isFavorite = action.payload.isFavorite;
        }
        if (indexOfFavoriteRoom === -1) {
          state.favoriteRooms.push(action.payload);
        } else {
          state.favoriteRooms.splice(indexOfFavoriteRoom, 1);
        }

      })
      .addCase(changeFavoriteOption.pending, (state) => {
        state.changeFavoriteRoomRequestStatus = RequestStatus.request;
      })
      .addCase(changeFavoriteOption.rejected, (state) => {
        state.changeFavoriteRoomRequestStatus = RequestStatus.error;
      })
      .addCase(fetchFavoriteRooms.fulfilled, (state, action) => {
        state.favoriteRoomsRequestStatus = RequestStatus.success;
        state.favoriteRooms = action.payload;
      })
      .addCase(fetchFavoriteRooms.pending, (state) => {
        state.favoriteRoomsRequestStatus = RequestStatus.request;
      })
      .addCase(fetchFavoriteRooms.rejected, (state) => {
        state.favoriteRoomsRequestStatus = RequestStatus.error;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.favoriteRoomsRequestStatus = RequestStatus.idle;
        state.roomsRequestStatus = RequestStatus.idle;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteRoomsRequestStatus = RequestStatus.idle;
        state.roomsRequestStatus = RequestStatus.idle;
      });
  }
});
