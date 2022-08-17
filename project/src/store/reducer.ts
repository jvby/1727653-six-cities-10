import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, RoomRequestStatus } from '../const';
import { CommentType } from '../types/comment';
import { RoomType } from '../types/room';
import { UserData } from '../types/user-data';
import {
  authorizationRequest,
  authorizationRequestFailure,
  authorizationRequestSuccess,
  changeActiveRoomOnMap,
  changeCity,
  changeSortType,
  loadActiveRoomData,
  loadActiveRoomFailure,
  loadActiveRoomRequest,
  loadCommentsData,
  loadCommentsFailure,
  loadCommentsRequest,
  loadNearRoomsData,
  loadNearRoomsFailure,
  loadNearRoomsRequest,
  loadRoomsData,
  loadRoomsFailure,
  loadRoomsRequest,
  postCommentsFailure,
  postCommentsRequest,
  requireAuthorization,
  setLoggedUser,
} from './action';

type InitialState = {
  city: string,
  rooms: RoomType[] | null,
  sortType: string,
  roomRequestStatus: RoomRequestStatus,
  authorizationStatus: AuthorizationStatus,
  loggedUser: UserData | null,
  activeRoomData: RoomType | null,
  activeRoomRequestStatus: RoomRequestStatus,
  nearRoomData: RoomType[] | null,
  nearRoomRequestStatus: RoomRequestStatus,
  commentsData: CommentType[] | null,
  commentsRequestStatus: RoomRequestStatus,
  activeRoomOnMap: RoomType | null,
  authorizationRequestStatus: RoomRequestStatus,
  postCommentRequest: RoomRequestStatus,
};

const initialState: InitialState = {
  city: 'Paris',
  rooms: null,
  sortType: 'Popular',
  roomRequestStatus: RoomRequestStatus.idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  loggedUser: null,
  activeRoomData: null,
  activeRoomRequestStatus: RoomRequestStatus.idle,
  nearRoomData: null,
  nearRoomRequestStatus: RoomRequestStatus.idle,
  commentsData: null,
  commentsRequestStatus: RoomRequestStatus.idle,
  activeRoomOnMap: null,
  authorizationRequestStatus: RoomRequestStatus.idle,
  postCommentRequest: RoomRequestStatus.idle,
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
    .addCase(setLoggedUser, (state, action) => {
      state.loggedUser = action.payload;
    })
    .addCase(loadActiveRoomData, (state, action) => {
      state.activeRoomData = action.payload;
      state.activeRoomRequestStatus = RoomRequestStatus.success;
    })
    .addCase(loadActiveRoomRequest, (state) => {
      state.activeRoomRequestStatus = RoomRequestStatus.request;
    })
    .addCase(loadActiveRoomFailure, (state) => {
      state.activeRoomRequestStatus = RoomRequestStatus.error;
    })
    .addCase(loadNearRoomsData, (state, action) => {
      state.nearRoomData = action.payload;
      state.nearRoomRequestStatus = RoomRequestStatus.success;
    })
    .addCase(loadNearRoomsRequest, (state) => {
      state.nearRoomRequestStatus = RoomRequestStatus.request;
    })
    .addCase(loadNearRoomsFailure, (state) => {
      state.nearRoomRequestStatus = RoomRequestStatus.error;
    })
    .addCase(loadCommentsData, (state, action) => {
      state.commentsData = action.payload;
      state.commentsRequestStatus = RoomRequestStatus.success;
    })
    .addCase(loadCommentsRequest, (state) => {
      state.commentsRequestStatus = RoomRequestStatus.request;
    })
    .addCase(loadCommentsFailure, (state) => {
      state.commentsRequestStatus = RoomRequestStatus.error;
    })
    .addCase(changeActiveRoomOnMap, (state, action) => {
      state.activeRoomOnMap = action.payload;
    })
    .addCase(authorizationRequest, (state) => {
      state.authorizationRequestStatus = RoomRequestStatus.request;
    })
    .addCase(authorizationRequestFailure, (state) => {
      state.authorizationRequestStatus = RoomRequestStatus.error;
    })
    .addCase(authorizationRequestSuccess, (state) => {
      state.authorizationRequestStatus = RoomRequestStatus.success;
    })
    .addCase(postCommentsFailure, (state) => {
      state.authorizationRequestStatus = RoomRequestStatus.error;
    })
    .addCase(postCommentsRequest, (state) => {
      state.authorizationRequestStatus = RoomRequestStatus.success;
    });
});

export {reducer};
