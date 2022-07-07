import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? "button_like_isLiked" : "";

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="button button_card_delete"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="card__title-like-container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-count-container">
          <button
            className={`button button_like ${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
