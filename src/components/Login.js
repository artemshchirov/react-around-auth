import { useState } from "react";

function Login({ handleLogin, validateForm }) {
  const [errorMessage, setErrorMessage] = useState("");

  // function handleChangeEmail(evt) {
  //   setEmail(evt.target.value);
  //   validateForm(evt.target.value, setIsEmailValid);
  // }
  // function handleChangePassword(evt) {
  //   setPassword(evt.target.value);
  //   validateForm(evt.target.value);
  // }

  const [loginData, setLoginData] = useState({});

  // const [message, setMessage] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) return;
    handleLogin(email, password);
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
          value={loginData["email"] || ""}
          onChange={handleChange}
          required
        />
        <span
          id="email-error"
          className={`entry__input-error ${"entry__input-error_visible"}`}
        >
          {/* {!isEmailValid && emailErrorMessage} */}
        </span>
        <input
          className={`entry__input ${"entry__input_type_error"}`}
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
