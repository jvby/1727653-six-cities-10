import { HeaderLogo } from '../header-logo/header-logo';
import { UserNavigation } from '../user-navigation/user-navigation';

export function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo/>
          <UserNavigation/>
        </div>
      </div>
    </header>
  );
}
