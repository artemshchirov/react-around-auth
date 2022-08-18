import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { register, authorize, getContent } from '../utils/auth';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoToolTip from './InfoToolTip';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Spinner from './Spinner';
import SubmitPopup from './SubmitPopup';
import api from '../utils/api';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [imagePopupCard, setImagePopupCard] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [statusInfoToolTip, setStatusInfoToolTip] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenCheck = () => {
      let jwt = localStorage.getItem('jwt');
      if (jwt) {
        getContent(jwt)
          .then((res) => {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate('/');
          })
          .catch((err) =>
            console.error(`Ошибка получения контента пользователя: ${err}`)
          );
      }
    };
    tokenCheck();
  }, [navigate]);

  useEffect(() => {
    setIsLoading(true);
    api
      .getUserInfo()
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, _id });
      })
      .catch((err) =>
        console.log(`Ошибка при загрузке данных пользователя: ${err}`)
      )
      .finally(() => {
        setIsLoading(false);
      });

    api
      .getInitialCards()
      .then((initialCards) => setCards(initialCards))
      .catch((err) =>
        console.log(
          `Ошибка при загрузке данных пользователя и создании всех карточек: ${err}`
        )
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleRegister = (email, password) => {
    register(password, email)
      .then(() => {
        setStatusInfoToolTip(true);
        setLoggedIn(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setStatusInfoToolTip(false);
        console.error(`Ошибка регистрации пользователя: ${err}`);
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/');
        }
      })
      .catch((err) => {
        setStatusInfoToolTip(false);
        setIsInfoToolTipOpen(true);
        console.error(`Ошибка авторизации пользователя: ${err}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddCardClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleSubmitDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setDeleteCard(card);
  }

  function handleCardClick(card) {
    setImagePopupCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setImagePopupCard(null);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then(() => {
        setCurrentUser({
          name,
          about,
          avatar: currentUser.avatar,
          _id: currentUser._id,
        });
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при обновлении name, about пользователя: ${err}`)
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .setAvatar({ avatar })
      .then(() => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar,
          _id: currentUser._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении аватара пользователя: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    setIsLoading(true);
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) =>
        console.log(`Ошибка при добавлении/удалении лайка: ${err}`)
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteItem(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при удалении карточки пользователя: ${err}`)
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .addItem(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при создании новой карточки пользователя: ${err}`)
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />

            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />

            <Route
              path="/"
              element={
                isLoading ? (
                  <Spinner />
                ) : (
                  <ProtectedRoute path="/" loggedIn={loggedIn}>
                    <Header
                      loggedIn={loggedIn}
                      email={userEmail}
                      handleLogout={handleLogout}
                    />
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onEditAvatar={handleEditAvatarClick}
                      onAddPlace={handleAddCardClick}
                      onCardDelete={handleSubmitDeleteClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      cards={cards}
                    />
                    <Footer />
                  </ProtectedRoute>
                )
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isSending={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isSending={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isSending={isLoading}
          />
          <SubmitPopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmitDelete={handleCardDelete}
            card={deleteCard}
            isSending={isLoading}
          />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            currentStatus={statusInfoToolTip}
          />
          <ImagePopup card={imagePopupCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App;
