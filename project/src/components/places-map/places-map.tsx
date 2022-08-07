import cn from 'classnames';
import { RoomType, City } from '../../types/room';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map/use-map';


type PlacesMapProps = {
  from: string;
  rooms: RoomType[];
  activeRoom?: number | null;
  activeCity: City | undefined;
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

const defaultCity = {
  'location': {
    'latitude': 52.370216,
    'longitude': 4.895168,
    'zoom': 10,
  },
  'name': 'Amsterdam',
};

export function PlacesMap({from, rooms, activeRoom, activeCity = defaultCity}: PlacesMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);


  useEffect(() => {
    if (map) {
      rooms.forEach((room) => {
        const marker = new Marker({
          lat: room.location.latitude,
          lng: room.location.longitude
        });

        marker
          .setIcon(
            activeRoom !== null && room.id === activeRoom
              ? pinActive
              : pin
          )
          .addTo(map);
      });

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
  }, [map, rooms, activeRoom, activeCity]);


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
