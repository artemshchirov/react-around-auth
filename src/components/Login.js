import { useState } from "react";
import Header from "./Header";

function Login({ handleLogin }) {
  const [loginData, setLoginData] = useState({});

  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState({});

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;

    setLoginData((oldData) => ({
      ...oldData,
      [name]: value,
    }));

    setIsValid(input.closest("form").checkValidity());
    setValidationMessage({
      ...validationMessage,
      [name]: input.validationMessage,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    if (evt.target.closest("form").checkValidity()) {
      const { email, password } = loginData;
      if (!email || !password) return;
      handleLogin(email, password);
    } else {
      setIsValid(false);
      setValidationMessage({
        email: "Please fill out this field.",
        password: "Please insert correct password.",
      });
    }
  }

  return (
    <>
      <Header navlink="/sign-up" linkText="Регистрация" />
      <form className="sign" name="login" onSubmit={handleSubmit} noValidate>
        <fieldset className="sign__wrapper">
          <legend className="sign__title">Вход</legend>

          <input
            className={`sign__input ${
              validationMessage.email && "sign__input_type_error"
            }`}
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            minLength="2"
            maxLength="320"
            value={loginData["email"] || ""}
            onChange={handleChange}
            required
          />
          <span
            id="email-error"
            className={`sign__input-error ${
              !isValid && "sign__input-error_visible"
            }`}
          >
            {validationMessage.email}
          </span>
          <input
            className={`sign__input ${
              validationMessage.password && "sign__input_type_error"
            }`}
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="15"
            value={loginData["password"] || ""}
            onChange={handleChange}
            required
          />
          <span
            id="password-error"
            className={`sign__input-error ${
              !isValid && "sign__input-error_visible"
            }`}
          >
            {validationMessage.password}
          </span>
          <button
            className={`button button_form_submit-sign ${
              !isValid && "button_disabled"
            }`}
            type="submit"
          >
            Войти
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default Login;
