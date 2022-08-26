import {NameSpace} from '../../const';
import {State} from '../../types/store';

export const getActiveCity = (state: State): string => state[NameSpace.UserInterface].city;

export const getSortType = (state: State): string => state[NameSpace.UserInterface].sortType;
