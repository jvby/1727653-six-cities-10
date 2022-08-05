import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<string>('offers/changeCity');

export const changeSortType = createAction<string>('offers/changeSortType');

