import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-mesto.svg';

function Login({ handleLogin }) {
  const [loginData, setLoginData] = useState({});

  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState({});

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;

    setLoginData((oldData) => ({
      ...oldData,
      [name]: value,
    }));

    setIsValid(input.closest('form').checkValidity());
    setValidationMessage({
      ...validationMessage,
      [name]: input.validationMessage,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    if (evt.target.closest('form').checkValidity()) {
      const { email, password } = loginData;
      if (!email || !password) return;
      handleLogin(email, password);
    } else {
      setIsValid(false);
      setValidationMessage({
        email: 'Please fill out this field.',
        password: 'Please insert correct password.',
      });
    }
  }

  return (
    <>
      <header className="header page__header">
        <img src={logo} alt="Логотип 'Место'" className="logo" />
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      </header>
      <section className="sign">
        <form name="login" onSubmit={handleSubmit} noValidate>
          <fieldset className="sign__form">
            <legend className="sign__title">Вход</legend>
            <input
              className={`sign__input ${
                validationMessage.email && 'sign__input_type_error'
              }`}
              name="email"
              id="email-signin"
              type="email-signin"
              placeholder="Email"
              minLength="2"
              maxLength="320"
              value={loginData.email || ''}
              onChange={handleChange}
              ref={inputRef}
              required
            />
            <span
              id="email-error"
              className={`sign__input-error ${
                !isValid && 'sign__input-error_visible'
              }`}
            >
              {validationMessage.email}
            </span>
            <input
              className={`sign__input ${
                validationMessage.password && 'sign__input_type_error'
              }`}
              name="password"
              id="password-signin"
              type="password-signin"
              placeholder="Пароль"
              minLength="2"
              maxLength="15"
              value={loginData.password || ''}
              onChange={handleChange}
              required
            />
            <span
              id="password-error"
              className={`sign__input-error ${
                !isValid && 'sign__input-error_visible'
              }`}
            >
              {validationMessage.password}
            </span>
            <button
              className={`button button_form_submit-sign ${
                !isValid && 'button_disabled'
              }`}
              type="submit"
            >
              Войти
            </button>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default Login;
