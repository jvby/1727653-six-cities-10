import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import RoomPage from '../../pages/room-page/room-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import {AuthorizationStatus} from '../../const';

type AppProps = {
  placeCount: number;
}

function App({placeCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage placeCount={placeCount}/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/favorites' element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavoritesPage />
          </PrivateRoute>
        }
        />
        <Route path='/offer/:id' element={<RoomPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
