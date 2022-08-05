import { CITIES } from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import { changeCity } from '../../store/action';
import cn from 'classnames';

export function CityTab(): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const renderCitiesList = () => CITIES.map((city: string) => (
    <li key={`city-${city}`}className="locations__item">
      <a
        className={cn('locations__item-link tabs__item', {
          'tabs__item--active': city === activeCity
        })}
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(changeCity(city));
        }}
        href="/#"
      >
        <span>{city}</span>
      </a>
    </li>
  ));

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {renderCitiesList()}
        </ul>
      </section>
    </div>
  );
}
