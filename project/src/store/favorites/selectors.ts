import {NameSpace, RequestStatus} from '../../const';
import { RoomType } from '../../types/room';
import {State} from '../../types/store';

export const getFavoriteRooms = (state: State): RoomType[] => state[NameSpace.Favorites].favoriteRooms;

export const getFavoriteRoomsRequestStatus = (state: State): RequestStatus => state[NameSpace.Favorites].favoriteRoomsRequestStatus;
