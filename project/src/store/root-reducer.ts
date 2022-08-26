import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { commentProcess } from './comments/comments';
import { roomProcess } from './rooms/rooms';
import { userInterfaceSlice } from './ui/ui';
import { userSlice } from './user/user';

export const rootReducer = combineReducers({
  [NameSpace.Comments]: commentProcess.reducer,
  [NameSpace.Rooms]: roomProcess.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.UserInterface]: userInterfaceSlice.reducer,
});
