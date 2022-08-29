import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { commentsSlice } from './comments/comments';
import { favoritesSlice } from './favorites/favorites';
import { roomsSlice } from './rooms/rooms';
import { userInterfaceSlice } from './ui/ui';
import { userSlice } from './user/user';

export const rootReducer = combineReducers({
  [NameSpace.Comments]: commentsSlice.reducer,
  [NameSpace.Rooms]: roomsSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.UserInterface]: userInterfaceSlice.reducer,
  [NameSpace.Favorites]: favoritesSlice.reducer,
});
