import { Fragment } from 'react';
import style from './not-found-page.module.css';

function NotFoundPage(): JSX.Element {
  return (
    <Fragment>
      <header className={style.top_header}>
      </header>

      <div>
        <div className={style.starsec}></div>
        <div className={style.starthird}></div>
        <div className={style.starfourth}></div>
        <div className={style.starfifth}></div>
      </div>

      <div className={style.lamp__wrap}>
        <div className={style.lamp}>
          <div className={style.cable}></div>
          <div className={style.cover}></div>
          <div className={style.in_cover}>
            <div className={style.bulb}></div>
          </div>
          <div className={style.light}></div>
        </div>
      </div>

      <section className={style.error}>

        <div className={style.error__content}>
          <div className={style.error__message}>
            <h1 className={style.message__title}>Page Not Found</h1>
            <p className={style.message__text}>We are sorry, the page you were looking for isn not found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
          </div>
          <div className={style.error__nav}>
            <div className={style.e_nav}>
              <a href="/" target="_self" className={style.e_nav__link}> </a>
            </div>
          </div>
        </div>


      </section>


    </Fragment>
  );
}

export default NotFoundPage;
