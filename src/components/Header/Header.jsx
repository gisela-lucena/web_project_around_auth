import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logoVector.svg";

function Header({ email = "", isLoggedIn = false, onSignOut }) {
  const location = useLocation();

  const authLinkConfig =
    location.pathname === "/signup"
      ? { to: "/signin", label: "Entrar" }
      : { to: "/signup", label: "Inscrever-se" };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <img className="header__logo-icon" src={logo} alt="Around the US" />
        </div>
        {isLoggedIn ? (
          <div className="header__auth">
            <p className="header__email">{email}</p>
            <button className="header__button" type="button" onClick={onSignOut}>
              Sair
            </button>
          </div>
        ) : (
          <Link className="header__link" to={authLinkConfig.to}>
            {authLinkConfig.label}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
