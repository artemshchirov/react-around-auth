import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile section content__section">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="User pic"
            className="profile__avatar"
          />
        </div>
        <div className="profile__content">
          <div className="profile__name-btn-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="button button_profile_edit"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="button button_profile_add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards section content__section">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
