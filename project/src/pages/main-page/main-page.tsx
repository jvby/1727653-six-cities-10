import { CardPlace } from '../../components/card-place/card-place';
import { Header } from '../../components/header/header';
import React, { useState } from 'react';
import { CityTab } from '../../components/city-tab/city-tab';
import { PlacesSort } from '../../components/places-sort/places-sort';
import { PlacesMap } from '../../components/places-map/places-map';
import {useAppSelector} from '../../hooks';
import {EmptyPlaces} from '../../components/places-empty/places-empty';
import cn from 'classnames';
import { defaultCity } from '../../const';


function MainPage(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const rooms = useAppSelector((state) => state.rooms).filter((room) => room.city.name === currentCity);
  const [activeRoom, setActiveRoom] = useState<number | null>(null);
  const activeCity = defaultCity;
  const activeSortType = useAppSelector((state) => state.sortType);

  const getSortedRooms = () => {
    switch (activeSortType) {
      case 'Popular':
        return rooms;
      case 'Price: low to high':
        return rooms.sort((a,b) => a.price - b.price);
      case 'Price: high to low':
        return rooms.sort((a,b) => b.price - a.price);
      case 'Top rated first':
        return rooms.sort((a,b) => b.rating - a.rating);
      default:
        return rooms;
    }
  };

  const sortedRooms = getSortedRooms();

  const updateActiveRoom = (newActiveRoom: number | null) => {
    if (activeRoom !== newActiveRoom) {
      setActiveRoom(newActiveRoom);
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={cn('page__main', 'page__main--index', {
        'page__main--index-empty': sortedRooms.length === 0
      })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <CityTab/>
        <div className="cities">
          <div className={cn('cities__places-container', 'container', {
            'cities__places-container--empty': sortedRooms.length === 0
          })}
          >
            {rooms.length === 0 ?
              <EmptyPlaces city={currentCity}/> :
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${sortedRooms.length} places to stay in ${currentCity}`}</b>
                <PlacesSort/>
                <div className="cities__places-list places__list tabs__content">
                  {sortedRooms.map((room) =>(
                    <CardPlace key={room.id} room={room} onMouseMove={updateActiveRoom} from={'main'}/>
                  ))}
                </div>
              </section>}
            <div className="cities__right-section">
              {sortedRooms.length !== 0 && <PlacesMap from='main' rooms={sortedRooms} activeRoom={activeRoom} activeCity={activeCity}/>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

}

export default MainPage;
