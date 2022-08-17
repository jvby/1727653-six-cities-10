import { HeaderLogo } from '../header-logo/header-logo';
import { UserNavigation } from '../user-navigation/user-navigation';

type HeaderProps = {
  userNavigation?: boolean;
}

export function Header({userNavigation = true}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo/>
          {userNavigation ? <UserNavigation/> : ''}
        </div>
      </div>
    </header>
  );
}
