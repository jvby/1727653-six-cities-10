import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/ui/ui';
import { getRandomCity } from '../../utils';

export function LoginPagePicture(): JSX.Element {
  const city = getRandomCity();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <a
          className="locations__item-link"
          href="/"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(changeCity(city));
            navigate(AppRoute.Main);
          }}
        >
          <span>{city}</span>
        </a>
      </div>
    </section>
  );
}
