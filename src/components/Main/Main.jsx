import editIcon from "../../images/editButtonVector.svg";
import addIcon from "../../images/addButton.png";
import { useContext } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import EditProfile from "./components/NewCard/EditProfile.jsx";
import EditAvatar from "./components/NewCard/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ConfirmPopup from "./components/NewCard/ConfirmPopup.jsx";
import useAppState from "../../hooks/useAppState.js";


function Main() {
  const newCardPopup = { title: "New card", children: <NewCard /> };
  const editProfilePopup = { title: "Edit profile", children: <EditProfile /> };
  const editAvatarPopup = { title: "Edit avatar", children: <EditAvatar /> };
  const { currentUser, handleCardDelete, handleCardLike } = useContext(CurrentUserContext);
  const { cards, popup, actions } = useAppState();
  
  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__picture">
            <img
              className="profile__image"
              src={currentUser.avatar || undefined}
              alt="Jacques Cousteau profile picture"
            />
            <div className="profile__picture-overlay">
              <button
                className="profile__edit-avatar"
                aria-label="Editar avatar"
                type="button"
                onClick={() => actions.openPopup(editAvatarPopup)}
              >
                <img
                  className="profile__avatar-edit-icon"
                  src={editIcon}
                  alt="Editar avatar"
                />
              </button>
            </div>
          </div>
          <div className="profile__info-container">
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                aria-label="Editar perfil"
                type="button"
                onClick={() => actions.openPopup(editProfilePopup)}
              >
                <img
                  className="profile__edit-icon"
                  src={editIcon}
                  alt="Editar perfil"
                />
              </button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-place"
            aria-label="Adicionar local"
            type="button"
            onClick={() => actions.openPopup(newCardPopup)}
          >
            <img
              className="profile__add-icon"
              src={addIcon}
              alt="Adicionar local"
            />
          </button>
        </section>
        <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={actions.openPopup}
              onCardLike={handleCardLike}
              onCardDelete={() => {
                actions.openPopup({
                  title: "Tem certeza?",
                  children: (
                    <ConfirmPopup
                      onConfirm={() => {
                        handleCardDelete(card);
                      }}
                    />
                  ),
                });
              }}
            />
          ))}
        </ul>
      </section>

        {popup && (
          <Popup title={popup.title}
            onClose={actions.closePopup}>
            {popup.children}
          </Popup>
        )}
      </main>
    </>
  );
}

export default Main;
