import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import RoomPage from '../../pages/room-page/room-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus, AppRoute } from '../../const';
import { RoomType } from '../../types/room';
import { CommentType } from '../../types/comment';


type AppProps = {
  rooms: RoomType[];
  comments: CommentType[];
}

function App({rooms, comments}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage rooms={rooms} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesPage rooms={rooms}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<RoomPage rooms={rooms} comments={comments}/>} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
