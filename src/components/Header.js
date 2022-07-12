import React from "react";
import logo from "../images/logo-mesto.svg";

export default function Header({ loggedIn, email, handleLogout }) {
  return (
    <header className="header page__header">
      <a href="https://artemschirov.github.io/mesto/index.html">
        <img src={logo} alt="Логотип 'Место'" className="logo" />
      </a>
      <div className="header__sign">
        {loggedIn && <p className="header__email">{email}</p>}
        <button onClick={handleLogout} className="header__link header__link_type_gray">
          {loggedIn ? "Выйти" : "Войти"}
        </button>
      </div>
    </header>
  );
}
