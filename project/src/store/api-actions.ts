import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { RoomType } from '../types/room';
import { APIRoute } from '../const';
import { loadRoomsData, loadRoomsFailure, loadRoomsRequest } from './action';

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
