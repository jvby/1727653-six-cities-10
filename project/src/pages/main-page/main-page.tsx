import { CardPlace } from '../../components/card-place/card-place';
import { RoomType } from '../../types/room';
import { Header } from '../../components/header/header';
import React, { useState } from 'react';
import { CityTab } from '../../components/city-tab/city-tab';
import { PlacesSort } from '../../components/places-sort/places-sort';
import { PlacesMap } from '../../components/places-map/places-map';

type MainPageProps = {
  rooms: RoomType[];
}

function MainPage({rooms}: MainPageProps): JSX.Element {
  const [activeRoom, setActiveRoom] = useState<number | null>(null);

  const updateActiveRoom = (newActiveRoom: number | null) => {
    if (activeRoom !== newActiveRoom) {
      setActiveRoom(newActiveRoom);
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityTab/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <PlacesSort/>
              <div className="cities__places-list places__list tabs__content">
                {rooms.map((room) =>(
                  <CardPlace key={room.id} room={room} onMouseMove={updateActiveRoom} from={'main'}/>
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <PlacesMap from={'main'}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

}

export default MainPage;
