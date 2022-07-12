import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-mesto.svg";

function Register({ handleRegister }) {
  const [registerData, setRegisterData] = useState({});

  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState({});

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;
    setRegisterData((oldData) => ({
      ...oldData,
      [name]: value,
    }));

    setIsValid(input.closest("form").checkValidity());
    setValidationMessage({
      ...validationMessage,
      [name]: input.validationMessage,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.closest("form").checkValidity()) {
      let { email, password } = registerData;
      console.log("handleSubmit:", email, password);
      if (!email || !password) return;
      handleRegister(email, password);
    } else {
      setIsValid(false);
      setValidationMessage({
        email: "Please fill out this field.",
        password: "Please fill out this field.",
      });
    }
  };

  return (
    <>
      <header className="header page__header">
        <img src={logo} alt="Логотип 'Место'" className="logo" />
        <Link to="/sign-in" className="header__link">
          Вход
        </Link>
      </header>
      <form className="sign" name="login" onSubmit={handleSubmit} noValidate>
        <fieldset className="sign__wrapper">
          <legend className="sign__title">Регистрация</legend>

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
            value={registerData["email"] || ""}
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
            value={registerData["password"] || ""}
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
            Зарегистрироваться
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default Register;
