import { useEffect } from "react";
import closeButton from "../images/addButton.png";

export default function InfoToolTip({
  isOpen,
  isSuccess,
  message,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__content popup__content_type_tooltip">
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close-icon"
            src={closeButton}
            alt="Fechar
                  popup"
          />
        </button>
        <div
          className={`popup__status-icon ${isSuccess
            ? "popup__status-icon_type_success"
            : "popup__status-icon_type_error"
            }`}
          aria-hidden="true"
        >
          {isSuccess ? "✓" : "X"}
        </div>
        <h2 className="popup__status-title">{message}</h2>
      </div>
    </div>
  );
}
