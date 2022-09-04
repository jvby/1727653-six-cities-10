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
  commentsRequestStatus: RequestStatus.Idle,
  postCommentRequestStatus: RequestStatus.Idle,
};

export const commentsSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postComment.fulfilled, (state, action) => {
        state.postCommentRequestStatus = RequestStatus.Success;
        state.commentsData = action.payload;
      })
      .addCase(postComment.rejected, (state) => {
        state.postCommentRequestStatus = RequestStatus.Error;
      })
      .addCase(postComment.pending, (state) => {
        state.postCommentRequestStatus = RequestStatus.Request;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsRequestStatus = RequestStatus.Success;
        state.commentsData = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.commentsRequestStatus = RequestStatus.Error;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsRequestStatus = RequestStatus.Request;
      });
  }
});
