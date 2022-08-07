import { createAction } from '@reduxjs/toolkit';
import { RoomType } from '../types/room';

export const changeCity = createAction<string>('offers/changeCity');

export const changeSortType = createAction<string>('offers/changeSortType');

export const loadRoomsData = createAction<RoomType[]>('offers/loadRoomsData');

export const loadRoomsRequest = createAction('offers/loadRoomsRequest');

export const loadRoomsFailure = createAction('offers/loadRoomsFailure');

