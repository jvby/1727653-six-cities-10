import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteOption } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';

type FavoriteButtonsProps = {
  isFavorite: boolean | undefined;
  from: string;
  roomID: number
}

export function FavoriteButton({ isFavorite, roomID, from }: FavoriteButtonsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const favoriteButtonClass = cn('button', {
    'place-card__bookmark-button': from === 'card-place',
    'place-card__bookmark-button--active': isFavorite && from === 'card-place',
    'property__bookmark-button ': from === 'room-page',
    'property__bookmark-button--active': isFavorite && from === 'room-page'
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

  const handleFavoriteChange = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(changeFavoriteOption({
        roomID,
        isFavorite: Number(!isFavorite),
      }));
    }
  };


  return (
    <button className={favoriteButtonClass} type="button" onClick={handleFavoriteChange}>
      <svg className='place-card__bookmark-icon' width={iconWidth(from)} height={iconHeight(from)}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
