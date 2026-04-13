import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logoVector.svg";
import useAppState from "../../hooks/useAppState.js";

function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth, actions } = useAppState();
  const { userEmail: email = "", isLoggedIn = false } = auth;

  const authLinkConfig =
    location.pathname === "/signup"
      ? { to: "/signin", label: "Entrar" }
      : { to: "/signup", label: "Inscrever-se" };

  return (
    <header className="header">
      {isLoggedIn && (
        <div
          className={`header__mobile-menu ${
            isMobileMenuOpen ? "header__mobile-menu_opened" : ""
          }`}
        >
          <p className="header__mobile-email">{email}</p>
          <button
            className="header__mobile-button"
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              actions.handleSignOut();
            }}
          >
            Sair
          </button>
        </div>
      )}
      <div className="header__content">
        <div className="header__logo">
          <img className="header__logo-icon" src={logo} alt="Around the US" />
        </div>
        {isLoggedIn ? (
          <>
            <div className="header__auth">
              <p className="header__email">{email}</p>
              <button className="header__button" type="button" onClick={actions.handleSignOut}>
                Sair
              </button>
            </div>
            <button
              className={`header__burger ${isMobileMenuOpen ? "header__burger_opened" : ""}`}
              type="button"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
            >
              <span className="header__burger-line" />
              <span className="header__burger-line" />
              <span className="header__burger-line" />
            </button>
          </>
        ) : (
          <Link
            className="header__link"
            to={authLinkConfig.to}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {authLinkConfig.label}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
