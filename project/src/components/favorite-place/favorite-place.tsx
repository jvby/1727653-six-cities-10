import {RoomType} from '../../types/room';
import { Link } from 'react-router-dom';

type FavoriteProps = {
  room: RoomType;
};

type Style = {
  width: string;
}

export function FavoritePlace({room}: FavoriteProps): JSX.Element {

  const getRating = (): Style => {
    if (room.rating === 5){
      return {width: '100%'};
    }
    if (room.rating >= 4 && room.rating < 5){
      return {width: '80%'};
    }
    if (room.rating >= 3 && room.rating < 4){
      return {width: '60%'};
    }
    if (room.rating >= 2 && room.rating < 3){
      return {width: '40%'};
    }
    if (room.rating >= 1 && room.rating < 2){
      return {width: '20%'};
    }
    else {
      return {width: '0%'};
    }
  };

  return (
    <article className="favorites__card place-card">
      {room.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${room.id}`}>
          <img className="place-card__image" src={room.previewImage} width="150" height="110" alt="Place"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{room.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={getRating()}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${room.id}`}>{room.title}</Link>
        </h2>
        <p className="place-card__type">{room.type}</p>
      </div>
    </article>

  );
}
