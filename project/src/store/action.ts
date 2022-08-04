import { createAction } from '@reduxjs/toolkit';
import { RoomType } from '../types/room';

export const changeCity = createAction<string>('offers/changeCity');

export const updatePropertyList = createAction<RoomType[]>('offers/updatePropertyList');

