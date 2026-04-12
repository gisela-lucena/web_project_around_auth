import "../App.css";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Layout from "./Layout.jsx";
import Signup from "./Register.jsx";
import Signin from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoToolTip from "./InfoToolTip.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth.js";
import { getToken, removeToken, setToken } from "../utils/token.js";
import api from "../utils/api.js";

const EMPTY_USER = { name: "", about: "", avatar: "" };

function getAuthUser(response) {
  return response?.data || response;
}

export default function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState(EMPTY_USER);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  function openInfoTooltip(isSuccess, message) {
    setIsRegistrationSuccess(isSuccess);
    setInfoTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  }

  function clearSession() {
    removeToken();
    setIsLoggedIn(false);
    setUserEmail("");
    setCards([]);
    setCurrentUser(EMPTY_USER);
  }

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((response) => {
        const userData = getAuthUser(response);
        setIsLoggedIn(true);
        setUserEmail(userData?.email || "");
      })
      .catch((error) => {
        console.error(error);
        clearSession();
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    api
      .getInitialData()
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isLoggedIn]);

  function handleRegistration(data) {
    auth
      .signup(data)
      .then(() => {
        openInfoTooltip(true, "Cadastro realizado com sucesso!");
        navigate("/signin");
      })
      .catch((error) => {
        console.error(error);
        openInfoTooltip(false, "Ops, algo deu errado. Por favor, tente novamente.");
      });
  }

  function handleLogin(data) {
    auth
      .signin(data)
      .then((response) => {
        const jwt = response.token || response.jwt;

        if (!jwt) {
          return Promise.reject(new Error("Ops, algo deu errado. Por favor, tente novamente."));
        }

        setToken(jwt);
        return auth.checkToken(jwt);
      })
      .then((response) => {
        const userData = getAuthUser(response);

        if (!userData) {
          return;
        }

        setIsLoggedIn(true);
        setUserEmail(userData.email || "");

        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        clearSession();
        openInfoTooltip(false, "Nao foi possivel entrar. Verifique email e senha.");
      });
  }

  function handleSignOut() {
    clearSession();
    navigate("/signin", { replace: true });
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    return api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) => (currentCard._id === card._id ? newCard : currentCard))
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    return api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  async function handleAddPlaceSubmit(card) {
    return api
      .addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateUser(data) {
    return api
      .setUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateAvatar(data) {
    return api
      .updateAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleOpenPopup(nextPopup) {
    setPopup(nextPopup);
  }

  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  const headerProps = {
    email: userEmail,
    isLoggedIn,
    onSignOut: handleSignOut,
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleCardLike,
        handleCardDelete,
        handleAddPlaceSubmit,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <Routes>
        <Route
          path="/signup"
          element={
            <Layout headerProps={headerProps}>
              <Signup handleRegistration={handleRegistration} />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout headerProps={headerProps}>
              <Signin handleLogin={handleLogin} />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <div className="page">
                <Header {...headerProps} />
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                />
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />} />
      </Routes>
      <InfoToolTip
        isOpen={isInfoTooltipOpen}
        isSuccess={isRegistrationSuccess}
        message={infoTooltipMessage}
        onClose={handleCloseInfoTooltip}
      />
    </CurrentUserContext.Provider>
  );
}
