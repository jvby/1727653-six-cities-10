import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import RoomPage from '../../pages/room-page/room-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../const';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { checkAuthAction, fetchFavoriteRooms, fetchRooms } from '../../store/api-actions';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteRooms());
    dispatch(fetchRooms());
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage/>} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <FavoritesPage/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<RoomPage/>} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
