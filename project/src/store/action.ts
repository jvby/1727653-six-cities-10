import { createAction } from '@reduxjs/toolkit';
import { RoomType } from '../types/room';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';
import { CommentType } from '../types/comment';


export const changeCity = createAction<string>('offers/changeCity');

export const changeSortType = createAction<string>('offers/changeSortType');

export const loadRoomsData = createAction<RoomType[]>('offers/loadRoomsData');

export const loadRoomsRequest = createAction('offers/loadRoomsRequest');

export const loadRoomsFailure = createAction('offers/loadRoomsFailure');

export const requireAuthorization = createAction<AuthorizationStatus>('offers/requireAuthorization');

export const setLoggedUser = createAction<UserData | null>('offers/setLoggedUser');

export const loadActiveRoomData = createAction<RoomType>('offers/loadActiveRoomData');

export const loadActiveRoomRequest = createAction('offers/loadActiveRoomRequest');

export const loadActiveRoomFailure = createAction('offers/loadActiveRoomFailure');

export const loadNearRoomsData = createAction<RoomType[]>('offers/loadNearRoomsData');

export const loadNearRoomsRequest = createAction('offers/loadNearRoomsRequest');

export const loadNearRoomsFailure = createAction('offers/loadNearRoomsFailure');

export const loadCommentsData = createAction<CommentType[]>('offers/loadCommentsData');

export const loadCommentsRequest = createAction('offers/loadCommentsRequest');

export const loadCommentsFailure = createAction('offers/loadCommentsFailure');

export const changeActiveRoomOnMap = createAction<RoomType>('offers/changeActiveRoomOnMap');

export const authorizationRequest = createAction('offers/authorizationRequest');

export const authorizationRequestFailure = createAction('offers/authorizationRequestFailure');

export const authorizationRequestSuccess = createAction('offers/authorizationRequestSuccess');

export const postCommentsFailure = createAction('offers/postCommentsFailure');

export const postCommentsRequest = createAction('offers/postCommentsRequest');
