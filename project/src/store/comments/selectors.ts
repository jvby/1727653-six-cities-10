import { MAX_COMMENTS_AMMOUNT, NameSpace, RequestStatus} from '../../const';
import { CommentType } from '../../types/comment';
import {State} from '../../types/store';
import { createSelector } from '@reduxjs/toolkit';
import { sortCommentsByDate } from '../../utils';


export const getPostCommentRequestStatus = (state: State): RequestStatus => state[NameSpace.Comments].postCommentRequestStatus;

export const getCommentsData = (state: State): CommentType[] => state[NameSpace.Comments].commentsData;

export const getComments = createSelector([getCommentsData], (comments) => [...comments].sort(sortCommentsByDate).slice(0, MAX_COMMENTS_AMMOUNT));
