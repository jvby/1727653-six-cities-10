import { getRandomCity } from '../../utils';

export function LoginPagePicture(): JSX.Element {
  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="/">
          <span>{getRandomCity()}</span>
        </a>
      </div>
    </section>
  );
}
