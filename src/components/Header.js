import logo from "../images/logo-mesto.svg";

export default function Header() {
  return (
    <header className="header page__header">
      <a href="https://artemschirov.github.io/mesto/index.html">
        <img src={logo} alt="Логотип 'Место'" className="logo" />
      </a>
    </header>
  );
}
