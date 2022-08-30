import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { UserInformation } from '../user-information/user-information';

export function UserNavigation(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ?
          <UserInformation/>
          :
          <li className="header__nav-item user">
            <a
              className="header__nav-link header__nav-link--profile"
              href="/#"
              onClick={(evt) => {
                evt.preventDefault();
                navigate(AppRoute.Login);
              }}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </a>
          </li>}
      </ul>
    </nav>
  );
}
