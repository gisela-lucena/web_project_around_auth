import "../App.css";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as auth from "../utils/auth";
import { setToken, getToken } from "../utils/token.js";
import api from "../utils/api";
import Signup from "./Register.jsx";
import Signin from "./Login.jsx";



export default function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({ username: "", email: "" });
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const handleRegistration = ({
    username,
    email,
    password
  }) => {
    if (password === confirmPassword) {
      auth
        .signup(username, password, email)
        .then(() => {
          navigate("/login");
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ username, password }) => {
    if (!username || !password) {
      return;
    }

    auth
      .signin(username, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          setUserData(data.user);
          setIsLoggedIn(true);

          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        // Se a resposta for bem-sucedida, permita o login do usuário, salve seus
        // dados no estado e mande ele para /ducks.
        setIsLoggedIn(true);
        setUserData({ username, email });

      })
      .catch(console.error);
  }, []);


  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });

    api.getUser().then((data) => {
      setCurrentUser(data)
    })
  }, []);


  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.isLiked;
    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    await api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((currentCard) => currentCard._id !== card._id))
      handleClosePopup();
    }).catch((error) => console.error(error));
  }

  async function handleAddPlaceSubmit(card) {
    await api.addNewCard(card.name, card.link).then((newCard) => {
      setCards([newCard, ...cards])
      handleClosePopup();
    }).catch((error) => console.error(error));
  }

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data.name, data.about).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      }).catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.updateAvatar(data.avatar).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      }).catch((error) => console.error(error));
    })();
  };

  function handleClosePopup() {
    setPopup(null);
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  return (
    <CurrentUserContext.Provider value={{
      currentUser, handleUpdateUser,
      handleUpdateAvatar, handleCardLike,
      handleCardDelete, handleAddPlaceSubmit, isLoggedIn, setIsLoggedIn
    }}>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route path="/signin" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />

        {/* rota protegida */}
        <Route
          path="/"
          element={
            isLoggedIn ?
              <div className="page">
                <Header />
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards} />
                <Footer />
              </div>
              : <Navigate to="/signin" replace />
          }
        />

      </Routes >
    </CurrentUserContext.Provider>
  );
}

