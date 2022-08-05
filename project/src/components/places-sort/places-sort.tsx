import { useState } from 'react';
import cn from 'classnames';
import {useAppSelector, useAppDispatch} from '../../hooks';
import { SORT_TYPE } from '../../const';
import { changeSortType } from '../../store/action';

export function PlacesSort(): JSX.Element {
  const [ sortListStatus, setSortListStatus ] = useState<boolean>(false);
  const activeSortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  const renderSortList = () => SORT_TYPE.map((type) => (
    <li
      key={`sort-${type}`}
      className={cn('places__option', {
        'places__option--active': activeSortType === type
      })}
      tabIndex={0}
      onClick={() => dispatch(changeSortType(type))}
    >
      {type}
    </li>
  ));

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setSortListStatus(!sortListStatus)}
      >
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options', 'places__options--custom', {
        'places__options--opened': sortListStatus === true
      })}
      >
        {renderSortList()}
      </ul>
    </form>
  );
}
