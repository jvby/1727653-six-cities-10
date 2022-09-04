
import {Navigate} from 'react-router-dom';
import {AuthorizationStatus, RequestStatus} from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationRequestStatus, getAuthorizationStatus } from '../../store/user/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authorizationRequestStatus = useAppSelector(getAuthorizationRequestStatus);

  if ([RequestStatus.Idle, RequestStatus.Request].includes(authorizationRequestStatus)){
    return (
      <LoadingScreen/>
    );
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to='/login' />
  );
}

export default PrivateRoute;
