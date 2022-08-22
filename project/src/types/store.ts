import { AuthorizationStatus, RequestStatus } from '../const.js';
import {store} from '../store/index.js';
import { RoomType } from './room.js';
import { UserData } from './user-data.js';
import { CommentType } from './comment.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
    authorizationStatus: AuthorizationStatus,
    authorizationRequestStatus: RequestStatus,
    loggedUser: UserData | null,
  };

export type RoomProcess = {
    rooms: RoomType[] | null,
    roomsRequestStatus: RequestStatus,
    activeRoomData: RoomType | null,
    activeRoomRequestStatus: RequestStatus,
    nearRoomData: RoomType[] | null,
    nearRoomRequestStatus: RequestStatus,
};

export type CommentProcess = {
    commentsData: CommentType[] | null,
    commentsRequestStatus: RequestStatus,
    postCommentRequestStatus: RequestStatus,
  };

export type UserInterfaceProcess = {
    city: string,
    sortType: string,
    activeRoomOnMap: RoomType | null,
};
