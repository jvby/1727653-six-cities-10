import cn from 'classnames';

type PlacesMapProps = {
  from: string
}

export function PlacesMap({from}: PlacesMapProps): JSX.Element {
  const mapClass = cn('map', {
    'cities__map': from === 'main',
    'property__map': from === 'place'
  });

  return (
    <section className={mapClass}></section>
  );
}
