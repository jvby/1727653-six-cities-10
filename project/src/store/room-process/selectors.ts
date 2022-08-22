import {NameSpace, RequestStatus} from '../../const';
import { RoomType } from '../../types/room';
import {State} from '../../types/store';

export const getRooms = (state: State): RoomType[] | null => state[NameSpace.Rooms].rooms;

export const getRoomsRequestStatus = (state: State): RequestStatus => state[NameSpace.Rooms].roomsRequestStatus;

export const getActiveRoomData = (state: State): RoomType | null => state[NameSpace.Rooms].activeRoomData;

export const getActiveRoomRequestStatus = (state: State): RequestStatus => state[NameSpace.Rooms].activeRoomRequestStatus;

export const getNearRoomData = (state: State): RoomType[] | null => state[NameSpace.Rooms].nearRoomData;
