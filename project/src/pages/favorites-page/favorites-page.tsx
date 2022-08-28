import { CardPlace } from '../../components/card-place/card-place';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteRooms, getFavoriteRoomsRequestStatus } from '../../store/rooms/selectors';
import { AppRoute, RequestStatus } from '../../const';
import { fetchFavoriteRooms } from '../../store/api-actions';
import { FavoritesEmpty } from '../../components/favorites-empty/favorites-empty';

function FavoritesPage(): JSX.Element {
  const favoriteRoomsRequestStatus = useAppSelector(getFavoriteRoomsRequestStatus);
  const dispatch = useAppDispatch();

  if ([RequestStatus.idle].includes(favoriteRoomsRequestStatus)) {
    dispatch(fetchFavoriteRooms());
  }

  const favoriteRooms = useAppSelector(getFavoriteRooms);
  const favoriteCities: string[] = Array.from(new Set(favoriteRooms.map((room) => room.city.name)));

  const renderPlaces = (city :string) => (
    favoriteRooms
      .filter((room) => room.city.name === city)
      .map((room) => <CardPlace key={room.id} room={room} from={'favorites'}/>)
  );

  const renderCities = () => favoriteCities.map((city) => (
    <li key={city} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {renderPlaces(city)}
      </div>
    </li>
  ));


  return (
    <div className="page">
      <Header/>
      {favoriteRooms.length === 0 ? <FavoritesEmpty/> :
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {renderCities()}
              </ul>
            </section>
          </div>
        </main>}
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
