import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { RoomType } from '../types/room';
import { APIRoute, AuthorizationStatus } from '../const';
import {
  authorizationRequest,
  authorizationRequestFailure,
  authorizationRequestSuccess,
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
  setLoggedUser
} from './action';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../token';
import { AuthData } from '../types/auth-data';
import { CommentData, CommentType } from '../types/comment';


export const fetchRooms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchRooms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(loadRoomsRequest());
    try {
      const {data} = await api.get<RoomType[]>(APIRoute.Rooms);
      dispatch(loadRoomsData(data));
    } catch (error) {
      dispatch(loadRoomsFailure());
    }
  },
);

export const fetchActiveRoom = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchActiveRoom',
  async (roomID, {dispatch, extra: api}) => {
    dispatch(loadActiveRoomRequest());
    try {
      const {data} = await api.get<RoomType>(`${APIRoute.Rooms}/${roomID}`);
      dispatch(loadActiveRoomData(data));
    } catch (error) {
      dispatch(loadActiveRoomFailure());
    }
  },
);

export const fetchNearRooms = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchActiveRoom',
  async (roomID, {dispatch, extra: api}) => {
    dispatch(loadNearRoomsRequest());
    try {
      const {data} = await api.get<RoomType[]>(`${APIRoute.Rooms}/${roomID}/nearby`);
      dispatch(loadNearRoomsData(data));
    } catch (error) {
      dispatch(loadNearRoomsFailure());
    }
  },
);

export const fetchComments = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchComments',
  async (roomID, {dispatch, extra: api}) => {
    dispatch(loadCommentsRequest());
    try {
      const {data} = await api.get<CommentType[]>(`${APIRoute.Comments}/${roomID}`);
      dispatch(loadCommentsData(data));
    } catch (error) {
      dispatch(loadCommentsFailure());
    }
  },
);

export const postComment = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/postComments',
  async ({comment, rating, roomID, onSuccess}, {dispatch, extra: api}) => {
    dispatch(postCommentsRequest());
    try {
      const {data} = await api.post<CommentType[]>(`${APIRoute.Comments}/${roomID}`, {comment, rating});
      dispatch(loadCommentsData(data));
      onSuccess();
    } catch (error) {
      dispatch(postCommentsFailure());
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setLoggedUser(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    dispatch(authorizationRequest());
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setLoggedUser(data));
      dispatch(authorizationRequestSuccess());
    } catch {
      dispatch(authorizationRequestFailure());
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setLoggedUser(null));
  },
);

