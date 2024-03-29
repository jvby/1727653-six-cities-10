import { useParams } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { PlacesMap } from '../../components/places-map/places-map';
import { NearPlaces } from '../../components/near-places/near-places';
import { getRating } from '../../utils';
import { Comments } from '../../components/comments/comments';
import { RoomGallery } from '../../components/room-gallery/room-gallery';
import { RoomGoods } from '../../components/room-goods/room-goods';
import { RoomMarks } from '../../components/room-marks/room-marks';
import { FavoriteButton } from '../../components/favorite-button/favorite-button';
import { RoomHost } from '../../components/room-host/room-host';
import style from './room-page.module.css';
import { fetchActiveRoom, fetchComments, fetchNearRooms } from '../../store/api-actions';
import { RequestStatus } from '../../const';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import { getActiveRoomData, getActiveRoomRequestStatus, getNearRoomData } from '../../store/rooms/selectors';

function RoomPage(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActiveRoom(params.id));
    dispatch(fetchNearRooms(params.id));
    dispatch(fetchComments(params.id));
  }, [params, dispatch]);

  const nearRooms = useAppSelector(getNearRoomData);
  const roomToRender = useAppSelector(getActiveRoomData);
  const activeRoomRequestStatus = useAppSelector(getActiveRoomRequestStatus);

  if ([RequestStatus.Idle, RequestStatus.Request]
    .includes(activeRoomRequestStatus) ||
    !roomToRender){
    return (
      <LoadingScreen/>
    );
  }

  if ([RequestStatus.Error].includes(activeRoomRequestStatus)){
    return (
      <NotFoundPage/>
    );
  }

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <RoomGallery images={roomToRender.images} type={roomToRender.type}/>
          <div className="property__container container">
            <div className="property__wrapper">
              <RoomMarks isPremium={roomToRender.isPremium} from={'room-page'}/>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {roomToRender.title}
                </h1>
                <FavoriteButton isFavorite={roomToRender.isFavorite} roomID={roomToRender.id} from={'room-page'}/>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRating(roomToRender ? roomToRender.rating : 0)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{roomToRender.rating}</span>
              </div>
              <ul className="property__features">
                <li className={style.property__feature__entire}>
                  {roomToRender.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${roomToRender.bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${roomToRender.maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{roomToRender.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <RoomGoods goods={roomToRender.goods}/>
              <RoomHost host={roomToRender.host} description={roomToRender.description}/>
              <Comments/>
            </div>
          </div>
          <PlacesMap from='place' rooms={nearRooms} activeRoom={roomToRender} activeCity={roomToRender.city}/>
        </section>
        <div className="container">
          <NearPlaces/>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;
