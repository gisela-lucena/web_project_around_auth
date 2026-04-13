import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import useAuth from "../hooks/useAuth.js";
import useInfoTooltip from "../hooks/useInfoTooltip.js";
import usePopup from "../hooks/usePopup.js";
import api from "../utils/api.js";

const EMPTY_USER = { name: "", about: "", avatar: "" };

export default function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(EMPTY_USER);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { popup, openPopup, closePopup } = usePopup();
  const { tooltip, openInfoTooltip, closeInfoTooltip } = useInfoTooltip();

  function resetAppData() {
    setCards([]);
    setCurrentUser(EMPTY_USER);
  }

  const authState = useAuth({
    navigate,
    location,
    onAuthError: resetAppData,
  });

  useEffect(() => {
    if (!authState.isLoggedIn) {
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
  }, [authState.isLoggedIn]);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) =>
        state.map((currentCard) => (currentCard._id === card._id ? newCard : currentCard))
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
      closePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit(card) {
    try {
      const newCard = await api.addNewCard(card.name, card.link);
      setCards((state) => [newCard, ...state]);
      closePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateUser(data) {
    try {
      const newData = await api.setUserInfo(data.name, data.about);
      setCurrentUser(newData);
      closePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateAvatar(data) {
    try {
      const newData = await api.updateAvatar(data.avatar);
      setCurrentUser(newData);
      closePopup();
    } catch (error) {
      console.error(error);
    }
  }

  function clearSession() {
    authState.clearSessionState();
    resetAppData();
  }

  async function onRegister(data) {
    return authState.handleRegistration(
      data,
      (message) => openInfoTooltip(true, message),
      (message) => openInfoTooltip(false, message)
    );
  }

  async function onLogin(data) {
    return authState.handleLogin(data, (message) => openInfoTooltip(false, message));
  }

  function onSignOut() {
    clearSession();
    navigate("/signin", { replace: true });
  }

  const currentUserValue = {
    currentUser,
    handleUpdateUser,
    handleUpdateAvatar,
    handleCardLike,
    handleCardDelete,
    handleAddPlaceSubmit,
    isLoggedIn: authState.isLoggedIn,
  };

  const appValue = {
    cards,
    popup,
    tooltip,
    auth: {
      isLoggedIn: authState.isLoggedIn,
      isCheckingAuth: authState.isCheckingAuth,
      userEmail: authState.userEmail,
    },
    actions: {
      openPopup,
      closePopup,
      closeInfoTooltip,
      handleRegistration: onRegister,
      handleLogin: onLogin,
      handleSignOut: onSignOut,
    },
  };

  return (
    <AppContext.Provider value={appValue}>
      <CurrentUserContext.Provider value={currentUserValue}>
        {children}
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}
