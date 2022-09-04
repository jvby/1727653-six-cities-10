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
  authorizationRequestStatus: RequestStatus.Idle,
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
        state.authorizationRequestStatus = RequestStatus.Success;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationRequestStatus = RequestStatus.Success;
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationRequestStatus = RequestStatus.Request;
      })
      .addCase(loginAction.pending, (state) => {
        state.authorizationRequestStatus = RequestStatus.Request;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizationRequestStatus = RequestStatus.Success;
        state.loggedUser = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationRequestStatus = RequestStatus.Error;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loggedUser = null;
      });
  }
});
