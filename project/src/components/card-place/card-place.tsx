import { RoomType } from '../../types/room';
import { generatePath, Link } from 'react-router-dom';
import { getRating } from '../../utils';
import { AppRoute } from '../../const';
import { FavoriteButton } from '../favorite-button/favorite-button';
import cn from 'classnames';
import { RoomMarks } from '../room-marks/room-marks';
import style from './card-place.module.css';

type CardPlaceProps = {
  room: RoomType;
  onMouseMove?: (roomID: number | null) => void;
  from: string;
}

export function CardPlace({room, onMouseMove, from}: CardPlaceProps): JSX.Element {

  const handleMouseOver = () => {
    onMouseMove && onMouseMove(room.id);
  };

  const handleMouseLeave = () => {
    onMouseMove && onMouseMove(null);
  };

  const articleClass = cn('place-card', {
    'cities__card': from === 'main',
    'favorites__card': from === 'favorites',
  });

  const imageWrapperClass = cn('place-card__image-wrapper', {
    'cities__image-wrapper': from === 'main',
    'favorites__image-wrapper': from === 'favorites'
  });

  const cardInfoClass = cn('place-card__info', {
    'favorites__card-info': from === 'favorites'
  });

  const imageWidth = (source: string) => {
    switch (source) {
      case 'place':
        return '260';
      case 'favorites':
        return '150';
      default:
        break;
    }
  };

  const imageHeight = (source: string) => {
    switch (source) {
      case 'place':
        return '200';
      case 'favorites':
        return '110';
      default:
        break;
    }
  };


  return (
    <article className={articleClass} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <RoomMarks isPremium={room.isPremium} from={'card-place'}/>
      <div className={imageWrapperClass}>
        <Link to={generatePath(AppRoute.Offer, {id: `${room.id}`})}>
          <img className="place-card__image" src={room.previewImage} width={imageWidth(from)} height={imageHeight(from)} alt="Place"/>
        </Link>
      </div>
      <div className={cardInfoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{room.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={room.isFavorite} from={'card-place'}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(room.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id: `${room.id}`})}>{room.title}</Link>
        </h2>
        <p className={style.card__type}>{room.type}</p>
      </div>
    </article>
  );
}
