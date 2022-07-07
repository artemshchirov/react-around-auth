import { useState } from "react";

function Login({ validateForm }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    validateForm(evt.target.value, setIsEmailValid);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
    validateForm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("login evt:", evt);
  }

  return (
    <form className="entry" name="login" onSubmit={handleSubmit} noValidate>
      <fieldset className="entry__wrapper">
        <legend className="entry__title">Вход</legend>

        <input
          className={`entry__input ${"entry__input_type_error"}`}
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          value={email || ""}
          onChange={handleChangeEmail}
          required
        />
        <span
          id="email-error"
          className={`entry__input-error ${
            !isEmailValid && "entry__input-error_visible"
          }`}
        >
          {!isEmailValid && emailErrorMessage}
        </span>
        <input
          className={`entry__input ${"entry__input_type_error"}`}
          name="password"
          id="password"
          type="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          value={password || ""}
          onChange={handleChangePassword}
          required
        />
        {/* <span
            id="about-edit-error"
            className={`form__input-error ${
              !isDescriptionValid && "form__input-error_visible"
            }`}
          >
            {!isDescriptionValid && descriptionErrorMessage}
          </span> */}

        <button
          className={`button button_form_submit-entry`}
          // className={`button button_form_submit-entry ${"button_disabled"}`}
          type="submit"
          // disabled={!props.buttonActive}
        >
          Войти
        </button>
      </fieldset>
    </form>
  );
}

export default Login;
