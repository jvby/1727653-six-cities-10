import {NameSpace, RequestStatus} from '../../const';
import { CommentType } from '../../types/comment';
import {State} from '../../types/store';

export const getPostCommentRequestStatus = (state: State): RequestStatus => state[NameSpace.Comments].postCommentRequestStatus;

export const getCommentsData = (state: State): CommentType[] | null => state[NameSpace.Comments].commentsData;
