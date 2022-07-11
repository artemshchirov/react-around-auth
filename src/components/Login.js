import { useState } from "react";

function Login({ handleLogin, validateForm }) {
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState({});

  const [loginData, setLoginData] = useState({});

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
        email: "Please insert correct email",
        password: "Please insert correct password",
      });
    }
  }

  return (
    <form className="entry" name="login" onSubmit={handleSubmit} noValidate>
      <fieldset className="entry__wrapper">
        <legend className="entry__title">Вход</legend>

        <input
          className={`entry__input ${
            validationMessage.email && "entry__input_type_error"
          }`}
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          value={loginData["email"] || ""}
          onChange={handleChange}
          required
        />
        <span
          id="email-error"
          className={`entry__input-error ${
            !isValid && "entry__input-error_visible"
          }`}
        >
          {validationMessage.email}
        </span>
        <input
          className={`entry__input ${
            validationMessage.password && "entry__input_type_error"
          }`}
          name="password"
          id="password"
          type="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          value={loginData["password"] || ""}
          onChange={handleChange}
          required
        />
        <span
          id="password-error"
          className={`entry__input-error ${
            !isValid && "entry__input-error_visible"
          }`}
        >
          {validationMessage.password}
        </span>
        <button
          className={`button button_form_submit-entry ${
            !isValid && "button_disabled"
          }`}
          type="submit"
        >
          Войти
        </button>
      </fieldset>
    </form>
  );
}

export default Login;
