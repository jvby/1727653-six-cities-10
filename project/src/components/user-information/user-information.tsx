import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { logoutAction } from '../../store/api-actions';
import { getFavoriteRooms } from '../../store/favorites/selectors';
import { getLoggedUser } from '../../store/user/selectors';

export function UserInformation(): JSX.Element {
  const loggedUser = useAppSelector(getLoggedUser);
  const favoriteRooms = useAppSelector(getFavoriteRooms);

  return (
    <Fragment>
      <li className="header__nav-item user">
        <Link className={'header__nav-link header__nav-link--profile'} to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img className="header__avatar user__avatar" src={loggedUser?.avatarUrl} width="74" height="74" alt="Host avatar"/>
          </div>
          <span className="header__user-name user__name">{loggedUser?.email}</span>
          <span className="header__favorite-count">{favoriteRooms.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="/#" onClick={(evt)=> {
          evt.preventDefault();
          store.dispatch(logoutAction());
        }}
        >
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </Fragment>
  );
}
