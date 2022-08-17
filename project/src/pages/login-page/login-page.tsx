import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import {AppRoute, AuthorizationStatus, RoomRequestStatus} from '../../const';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { LoginPagePicture } from '../../components/login-page-picture/login-page-picture';
import { LoginForm } from '../../components/login-form/login-form';
import { Header } from '../../components/header/header';

function LoginPage(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const authorizationRequest = useAppSelector((state) => state.authorizationRequestStatus);

  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]
  );

  if (authorizationRequest === RoomRequestStatus.request) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <div className="page page--gray page--login">
      <Header userNavigation={false} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm/>
          <LoginPagePicture/>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
