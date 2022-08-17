import { CardPlace } from '../card-place/card-place';
import { useAppSelector } from '../../hooks';


export function NearPlaces(): JSX.Element {
  const nearRooms = useAppSelector((state) => state.nearRoomData);
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearRooms?.map((room) =>(
          <CardPlace key={room.id} room={room} from='near'/>
        ))}
      </div>
    </section>
  );
}
