import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { commentProcess } from './ comment-process/comment-process';
import { roomProcess } from './room-process/room-process';
import { userInterfaceProcess } from './UI-process/UI-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Comments]: commentProcess.reducer,
  [NameSpace.Rooms]: roomProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.UI]: userInterfaceProcess.reducer,
});
