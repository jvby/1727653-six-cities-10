import { CardPlace } from '../../components/card-place/card-place';
import { RoomType } from '../../types/room';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';


type FavoritesPageProps = {
  rooms: RoomType[];
}

function FavoritesPage({rooms}: FavoritesPageProps): JSX.Element {
  const favoriteRooms: RoomType[] = rooms.filter((room) => room.isFavorite === true);
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {renderCities()}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
