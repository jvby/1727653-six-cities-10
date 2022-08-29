import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { FavoriteData, RoomType } from '../types/room';
import { APIRoute } from '../const';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../token';
import { AuthData } from '../types/auth-data';
import { CommentData, CommentType } from '../types/comment';
import { toast } from 'react-toastify';


export const fetchRooms = createAsyncThunk<RoomType[], undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchRooms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<RoomType[]>(APIRoute.Rooms);
    return data;
  },
);

export const fetchFavoriteRooms = createAsyncThunk<RoomType[], undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchFavoriteRooms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<RoomType[]>(APIRoute.Favorites);
    return data;
  },
);

export const fetchActiveRoom = createAsyncThunk<RoomType, string | undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchActiveRoom',
  async (roomID, {extra: api}) => {
    const {data} = await api.get<RoomType>(`${APIRoute.Rooms}/${roomID}`);
    return data;
  },
);

export const fetchNearRooms = createAsyncThunk<RoomType[], string | undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchNearRooms',
  async (roomID, {extra: api}) => {
    const {data} = await api.get<RoomType[]>(`${APIRoute.Rooms}/${roomID}/nearby`);
    return data;
  },
);

export const changeFavoriteOption = createAsyncThunk<RoomType, FavoriteData, {
  state: State,
  extra: AxiosInstance
}>(
  'offers/changeFavoriteOption',
  async ({roomID, isFavorite}, {extra: api}) => {
    const {data} = await api.post<RoomType>(`${APIRoute.Favorites}/${roomID}/${isFavorite}`);
    return data;
  },
);

export const fetchComments = createAsyncThunk<CommentType[], string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchComments',
  async (roomID, {extra: api}) => {
    const {data} = await api.get<CommentType[]>(`${APIRoute.Comments}/${roomID}`);
    return data;
  },
);

export const postComment = createAsyncThunk<CommentType[], CommentData, {
  state: State,
  extra: AxiosInstance
}>(
  'offers/postComments',
  async ({comment, rating, roomID, onSuccess}, {extra: api}) => {
    const {data} = await api.post<CommentType[]>(`${APIRoute.Comments}/${roomID}`, {comment, rating});
    onSuccess();
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'offers/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/login',
  async ({login: email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'offers/logout',
  async (_arg, {dispatch, extra: api}) => {
    try{
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(fetchRooms());
    }
    catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      throw e;
    }
  },
);

