import { CardPlace } from '../../components/card-place/card-place';
import { Header } from '../../components/header/header';
import React, { useState } from 'react';
import { CityTab } from '../../components/city-tab/city-tab';
import { PlacesSort } from '../../components/places-sort/places-sort';
import { PlacesMap } from '../../components/places-map/places-map';
import {useAppSelector} from '../../hooks';
import {EmptyPlaces} from '../../components/places-empty/places-empty';
import cn from 'classnames';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { ErrorScreen } from '../../components/error-screen/error-screen';
import { DefaultCity, RequestStatus } from '../../const';
import { getRooms, getRoomsRequestStatus } from '../../store/room-process/selectors';
import { getActiveCity, getSortType } from '../../store/UI-process/selectors';

function MainPage(): JSX.Element {
  const currentCity = useAppSelector(getActiveCity);
  const rooms = useAppSelector(getRooms)?.filter((room) => room.city.name === currentCity);
  const [activeRoomID, setActiveRoomID] = useState<number | null>(null);
  const activeSortType = useAppSelector(getSortType);
  const roomsRequestStatus = useAppSelector(getRoomsRequestStatus);

  if ([RequestStatus.idle, RequestStatus.request].includes(roomsRequestStatus)){
    return (
      <LoadingScreen/>
    );
  }

  if ([RequestStatus.error].includes(roomsRequestStatus)){
    return (
      <ErrorScreen/>
    );
  }

  const activeCity = rooms ? rooms[1].city : DefaultCity;

  const getSortedRooms = () => {
    switch (activeSortType) {
      case 'Popular':
        return rooms;
      case 'Price: low to high':
        return rooms?.sort((a,b) => a.price - b.price);
      case 'Price: high to low':
        return rooms?.sort((a,b) => b.price - a.price);
      case 'Top rated first':
        return rooms?.sort((a,b) => b.rating - a.rating);
      default:
        return rooms;
    }
  };

  const sortedRooms = getSortedRooms();

  const updateActiveRoom = (newActiveRoomID: number | null) => {
    if (activeRoomID !== newActiveRoomID) {
      setActiveRoomID(newActiveRoomID);
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={cn('page__main', 'page__main--index', {
        'page__main--index-empty': sortedRooms?.length === 0
      })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <CityTab/>
        <div className="cities">
          <div className={cn('cities__places-container', 'container', {
            'cities__places-container--empty': sortedRooms?.length === 0
          })}
          >
            {rooms?.length === 0 ?
              <EmptyPlaces city={currentCity}/> :
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${sortedRooms?.length} places to stay in ${currentCity}`}</b>
                <PlacesSort/>
                <div className="cities__places-list places__list tabs__content">
                  {sortedRooms?.map((room) =>(
                    <CardPlace key={room.id} room={room} onMouseMove={updateActiveRoom} from='main'/>
                  ))}
                </div>
              </section>}
            <div className="cities__right-section">
              {sortedRooms?.length !== 0 && <PlacesMap from='main' rooms={rooms} activeRoomID={activeRoomID} activeCity={activeCity}/>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

}

export default MainPage;
