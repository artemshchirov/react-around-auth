import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-mesto.svg";

export default function Header({ linkText }) {
  return (
    <header className="header page__header">
      <a href="https://artemschirov.github.io/mesto/index.html">
        <img src={logo} alt="Логотип 'Место'" className="logo" />
      </a>
      <Link to="/sign-in" className="header__link">
        {linkText}
      </Link>
    </header>
  );
}
