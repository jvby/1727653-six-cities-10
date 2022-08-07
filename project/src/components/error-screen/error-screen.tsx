import { store } from '../../store';
import { fetchRooms } from '../../store/api-actions';
import style from './error-screen.module.css';

export function ErrorScreen(): JSX.Element {
  return (
    <div className={style.error_wrapper}>
      <p className={style.error_message}> We have some technical issues, please try again!</p>
      <a
        className={style.error_button}
        href="/#"
        onClick={
          (evt) => {
            evt.preventDefault();
            store.dispatch(fetchRooms());
          }
        }
      ><span>Try again!</span>
      </a>
    </div>
  );

}
