import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus, RequestStatus} from '../../const';
import {UserProcess} from '../../types/store';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationRequestStatus: RequestStatus.idle,
  loggedUser: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.loggedUser = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
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
