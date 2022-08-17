import { FormEvent, useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import cn from 'classnames';
import style from './login-page.module.css';

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

export function LoginForm(): JSX.Element {
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
      regex: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
    },
  });

  const dispatch = useAppDispatch();

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

  return (
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
  );
}
