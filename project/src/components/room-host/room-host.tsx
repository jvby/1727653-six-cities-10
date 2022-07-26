import cn from 'classnames';
import { Host } from '../../types/room';

type RoomHostProps = {
  host: Host | undefined;
  description: string | undefined;
}


export function RoomHost({host, description}: RoomHostProps): JSX.Element {
  const isProClasses = cn(
    'property__avatar-wrapper',
    'user__avatar-wrapper',
    host?.isPro && 'property__avatar-wrapper--pro'
  );

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={isProClasses}>
          <img className="property__avatar user__avatar" src={host?.avatarUrl} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="property__user-name">
          {host?.name}
        </span>
        <span className="property__user-status">
          {host?.isPro && 'Pro'}
        </span>
      </div>
      <div className="property__description">
        <p className="property__text">
          {description}
        </p>
      </div>
    </div>
  );

}
