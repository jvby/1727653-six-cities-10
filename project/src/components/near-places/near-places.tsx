import { CardPlace } from '../card-place/card-place';
import { RoomType } from '../../types/room';

type NearPlacesProps = {
  rooms: RoomType[] | undefined;
}

export function NearPlaces({rooms}: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {rooms?.map((room) =>(
          <CardPlace key={room.id} room={room} from='near'/>
        ))}
      </div>
    </section>
  );
}
