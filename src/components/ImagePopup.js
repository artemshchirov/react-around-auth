import { useEffect } from 'react';

export default function ImagePopup({ card, onClose }) {
  const isOpen = !!card;
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeCLose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeCLose);
    return () => {
      document.removeEventListener('keydown', handleEscapeCLose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget && isOpen) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_card-fullscreen" ${card && 'popup_opened'}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="popup__overlay" onClick={onClose}></div>
      <figure className="popup__figure">
        <button
          className="button button_popup_close"
          onClick={onClose}
        ></button>
        <img
          src={card && card.link}
          alt={card && card.name}
          className="popup__image"
        />
        <figcaption className="popup__image-title">
          {card && card.name}
        </figcaption>
      </figure>
    </div>
  );
}
