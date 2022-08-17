import cn from 'classnames';
import { RoomType, City } from '../../types/room';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { DefaultCity } from '../../const';


type PlacesMapProps = {
  from: string;
  rooms: RoomType[] | undefined | null;
  activeRoomID?: number | null;
  activeCity: City | undefined;
  activeRoom?: RoomType | null;
}

const pin = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const pinActive = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

export function PlacesMap({from, rooms, activeRoomID, activeRoom, activeCity = DefaultCity}: PlacesMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);


  useEffect(() => {
    if (map) {
      rooms?.forEach((room) => {
        const marker = new Marker({
          lat: room.location.latitude,
          lng: room.location.longitude
        });

        marker
          .setIcon(
            activeRoomID !== null && room.id === activeRoomID
              ? pinActive
              : pin
          )
          .addTo(map);
      });

      if (activeRoom) {
        const marker = new Marker({
          lat: activeRoom.location.latitude,
          lng: activeRoom.location.longitude
        });

        marker
          .setIcon(pinActive)
          .addTo(map);
      }

      map.flyTo(
        {
          lat: activeCity.location.latitude,
          lng: activeCity.location.longitude
        },
        activeCity.location.zoom,
        {
          animate: false,
        }
      );
    }
  }, [map, rooms, activeRoomID, activeCity, activeRoom]);


  const mapClass = cn('map', {
    'cities__map': from === 'main',
    'property__map': from === 'place'
  });

  return (
    <section
      className={mapClass}
      ref={mapRef}
    >
    </section>
  );
}
