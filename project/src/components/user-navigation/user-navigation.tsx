import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { logoutAction } from '../../store/api-actions';

export function UserNavigation(): JSX.Element {
const authorizationStatus = useAppSelector((state) => state.authorizationStatus);


  return (
    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.Auth?
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="/#">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            <span className="header__favorite-count">3</span>
          </a>
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
        :
        <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                  </li>
                  }
      </ul>
    </nav>
  );
}
