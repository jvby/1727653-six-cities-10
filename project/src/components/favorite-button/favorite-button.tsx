import cn from 'classnames';

type FavoriteButtonsProps = {
  isFavorite: boolean | undefined;
  from: string
}

export function FavoriteButton({ isFavorite, from }: FavoriteButtonsProps): JSX.Element {

  const favoriteButtonClass = cn('button', {
    'place-card__bookmark-button': from === 'card-place',
    'place-card__bookmark-button--active': isFavorite === true && from === 'card-place',
    'property__bookmark-button ': from === 'room-page',
    'property__bookmark-button--active': isFavorite === true && from === 'room-page'
  });

  const favoriteIconClass = cn({
    'property__bookmark-icon': from === 'room-page',
    'place-card__bookmark-icon': from === 'card-place',
  });

  const iconWidth = (source: string) => {
    switch (source) {
      case 'card-place':
        return '18';
      case 'room-page':
        return '31';
      default:
        break;
    }
  };

  const iconHeight = (source: string) => {
    switch (source) {
      case 'card-place':
        return '19';
      case 'room-page':
        return '33';
      default:
        break;
    }
  };


  return (
    <button className={favoriteButtonClass} type="button">
      <svg className={favoriteIconClass} width={iconWidth(from)} height={iconHeight(from)}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
