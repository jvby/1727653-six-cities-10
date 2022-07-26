import cn from 'classnames';

type RoomMarksProps = {
  isPremium: boolean | undefined
  from: string;
}

export function RoomMarks({ isPremium, from}: RoomMarksProps): JSX.Element | null {
  const markClass = cn({
    'property__mark': from === 'room-page',
    'place-card__mark': from === 'card-place',
  });

  if (isPremium === true) {
    return (
      <div className={markClass}>
        <span>Premium</span>
      </div>
    );
  }
  return (null);
}


