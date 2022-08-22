import {NameSpace} from '../../const';
import {State} from '../../types/store';

export const getActiveCity = (state: State): string => state[NameSpace.UI].city;

export const getSortType = (state: State): string => state[NameSpace.UI].sortType;
