import { createSelector } from '@reduxjs/toolkit';
import {NameSpace, RequestStatus, SortingType} from '../../const';
import { RoomType } from '../../types/room';
import {State} from '../../types/store';
import { getActiveCity, getSortType } from '../ui/selectors';

export const getRooms = (state: State): RoomType[] => state[NameSpace.Rooms].rooms;

export const getRoomsRequestStatus = (state: State): RequestStatus => state[NameSpace.Rooms].roomsRequestStatus;

export const getActiveRoomData = (state: State): RoomType | null => state[NameSpace.Rooms].activeRoomData;

export const getActiveRoomRequestStatus = (state: State): RequestStatus => state[NameSpace.Rooms].activeRoomRequestStatus;

export const getNearRoomData = (state: State): RoomType[] => state[NameSpace.Rooms].nearRoomData;

export const getFiltredAndSortedRooms = createSelector(
  [getRooms, getActiveCity, getSortType],
  (rooms, activeCity, sortType) => {
    const filtredRooms = rooms.filter((room) => room.city.name === activeCity);
    switch (sortType) {
      case SortingType.Popular:
        return filtredRooms;
      case SortingType.PriceHighToLow:
        return filtredRooms.sort((a,b) => a.price - b.price);
      case SortingType.PriceLowToHigh:
        return filtredRooms.sort((a,b) => b.price - a.price);
      case SortingType.TopRated:
        return filtredRooms.sort((a,b) => b.rating - a.rating);
      default:
        return filtredRooms;
    }
  });
