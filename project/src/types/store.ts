import { RequestStatus } from '../const.js';
import {store} from '../store/index.js';
import { CommentType } from './comment.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CommentProcess = {
    commentsData: CommentType[] | null,
    commentsRequestStatus: RequestStatus,
    postCommentRequestStatus: RequestStatus,
  };

