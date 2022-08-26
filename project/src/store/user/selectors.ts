import {AuthorizationStatus, NameSpace, RequestStatus} from '../../const';
import {State} from '../../types/store';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getAuthorizationRequestStatus = (state: State): RequestStatus => state[NameSpace.User].authorizationRequestStatus;

export const getLoggedUser = (state: State): UserData | null => state[NameSpace.User].loggedUser;
