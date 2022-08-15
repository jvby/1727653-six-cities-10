import {FormEvent, useEffect, useState, ChangeEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import {AppRoute, AuthorizationStatus, RoomRequestStatus} from '../../const';
import { HeaderLogo } from '../../components/header-logo/header-logo';
import { getRandomCity } from '../../utils';
import cn from 'classnames';
import style from './login-page.module.css';
import LoadingScreen from '../../components/loading-screen/loading-screen';

const formFields = {
  email: 'E-mail',
  password: 'Password',
};

type FieldProps = {
  value: string;
  error: boolean;
  errorText: string;
  regex: RegExp;
}

type FormStateProps = {
  [ key: string ]: FieldProps
}

function LoginPage(): JSX.Element {
  const [formState, setFormState] = useState<FormStateProps>({
    email: {
      value: '',
      error: false,
      errorText: 'Please enter correct email.',
      regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      value: '',
      error: false,
      errorText: 'Please enter correct password.',
      regex: /^\S*$/,
    },
  }

  );
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const authorizationRequest = useAppSelector((state) => state.authorizationRequestStatus);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]
  );

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      login: formState.email.value,
      password: formState.password.value,
    });
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const rule = formState[name].regex;
    const isValidValue = rule.test(value);

    setFormState({
      ...formState,
      [name]: {
        ...formState[name],
        value: value,
        error: !isValidValue,
      }});
  };

  const isSubmitButtonDisabled =
    formState.email.error ||
    formState.password.error ||
    formState.password.value === '';

  if (authorizationRequest === RoomRequestStatus.request) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              {Object.entries(formFields).map(([name, label]) => {
                const isValidInputClass = cn('login__input','form__input', {
                  [style.login__error]: formState[name].error,
                });

                return (
                  <div key={name} className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">{label}</label>
                    <input
                      className={isValidInputClass}
                      type={name}
                      name={name}
                      placeholder={label}
                      value={formState[name].value}
                      onChange={handleChange}
                    />
                    {formState[name].error ? <p className={style.error__text}>{formState[name].errorText}</p> : ''}
                  </div>
                );
              })}
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isSubmitButtonDisabled}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>{getRandomCity()}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
