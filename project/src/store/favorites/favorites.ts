import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestStatus} from '../../const';
import { RoomType } from '../../types/room';
import { changeFavoriteOption, fetchFavoritesRooms } from '../api-actions';

export type RoomsInitialState = {
  changeFavoriteRoomRequestStatus: RequestStatus,
  favoriteRooms: RoomType[],
  favoriteRoomsRequestStatus: RequestStatus,
};

const initialState: RoomsInitialState = {
  changeFavoriteRoomRequestStatus: RequestStatus.idle,
  favoriteRooms: [],
  favoriteRoomsRequestStatus: RequestStatus.idle,
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeFavoriteOption.fulfilled, (state, action) => {
        state.changeFavoriteRoomRequestStatus = RequestStatus.success;
        const indexOfFavoriteRoom = state.favoriteRooms.findIndex((room) => room.id === action.payload.id);
        if (indexOfFavoriteRoom === -1) {
          state.favoriteRooms.push(action.payload);
        } else {
          state.favoriteRooms = state.favoriteRooms.filter((room) => room.id !== action.payload.id);
        }

      })
      .addCase(changeFavoriteOption.pending, (state) => {
        state.changeFavoriteRoomRequestStatus = RequestStatus.request;
      })
      .addCase(changeFavoriteOption.rejected, (state) => {
        state.changeFavoriteRoomRequestStatus = RequestStatus.error;
      })
      .addCase(fetchFavoritesRooms.fulfilled, (state, action) => {
        state.favoriteRoomsRequestStatus = RequestStatus.success;
        state.favoriteRooms = action.payload;
      })
      .addCase(fetchFavoritesRooms.pending, (state) => {
        state.favoriteRoomsRequestStatus = RequestStatus.request;
      })
      .addCase(fetchFavoritesRooms.rejected, (state) => {
        state.favoriteRoomsRequestStatus = RequestStatus.error;
      });
  }
});
