import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestStatus} from '../../const';
import { CommentType } from '../../types/comment';
import { fetchComments, postComment } from '../api-actions';

export type CommentsInitialState = {
  commentsData: CommentType[],
  commentsRequestStatus: RequestStatus,
  postCommentRequestStatus: RequestStatus,
};

const initialState: CommentsInitialState = {
  commentsData: [],
  commentsRequestStatus: RequestStatus.idle,
  postCommentRequestStatus: RequestStatus.idle,
};

export const commentProcess = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postComment.fulfilled, (state, action) => {
        state.postCommentRequestStatus = RequestStatus.success;
        state.commentsData = action.payload;
      })
      .addCase(postComment.rejected, (state) => {
        state.postCommentRequestStatus = RequestStatus.error;
      })
      .addCase(postComment.pending, (state) => {
        state.postCommentRequestStatus = RequestStatus.request;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsRequestStatus = RequestStatus.success;
        state.commentsData = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.commentsRequestStatus = RequestStatus.error;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsRequestStatus = RequestStatus.request;
      });
  }
});
