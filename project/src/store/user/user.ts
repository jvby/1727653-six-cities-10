import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus, RequestStatus} from '../../const';
import { UserData } from '../../types/user-data';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

export type User = {
  authorizationStatus: AuthorizationStatus,
  authorizationRequestStatus: RequestStatus,
  loggedUser: UserData | null,
};

const initialState: User = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationRequestStatus: RequestStatus.idle,
  loggedUser: null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.loggedUser = action.payload;
        state.authorizationRequestStatus = RequestStatus.success;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationRequestStatus = RequestStatus.success;
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationRequestStatus = RequestStatus.request;
      })
      .addCase(loginAction.pending, (state) => {
        state.authorizationRequestStatus = RequestStatus.request;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizationRequestStatus = RequestStatus.success;
        state.loggedUser = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationRequestStatus = RequestStatus.error;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loggedUser = null;
      });
  }
});
