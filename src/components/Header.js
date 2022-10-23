import React from 'react';
import logo from '../images/logo-around.svg';

export default function Header({ loggedIn, email, handleLogout }) {
  return (
    <header className="header page__header">
      <a
        href="https://github.com/artemshchirov"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logo} alt="logo 'Around'" className="logo button" />
      </a>

      <div className="header__sign">
        {loggedIn && <p className="header__email">{email}</p>}
        <button
          onClick={handleLogout}
          className="header__link header__link_type_gray"
        >
          {loggedIn ? 'Sign out' : 'Sign in'}
        </button>
      </div>
    </header>
  );
}
