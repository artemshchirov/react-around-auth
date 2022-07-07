export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_card-fullscreen" ${card && "popup_opened"}`}>
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
