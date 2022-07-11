import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Spinner from "./Spinner";
import api from "../utils/api";
import SubmitPopup from "./SubmitPopup";
import Login from "./Login";
import Register from "./Register";
import { register } from "../utils/auth";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

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

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      api.getContent(jwt).then((res) => {
        if (res.email) {
          localStorage.setItem("jwt", res.jwt);
          setUserData({
            username: res.user.username,
            email: res.user.email,
          });
          setLoggedIn(true);
          navigate("/");
        }
      });
    }
  };

  const [userData, setUserData] = useState({});

  const handleRegister = (email, password) => {
    console.log("handleRegister email, password:", email, password);
    register(password, email).then((data) => {
      console.log("handleRegister data:", data);
      if (data._id) {
        console.log("data.jwt:", data._id);
        localStorage.setItem("jwt", data._id);
        // setUserData({
        //   email: data.user.email,
        //   password: data.user.password,
        // });
        // setLoggedIn(true);
      }
    });
  };

  const handleLogin = (email, password) => {
    console.log("handleLogin: ", handleLogin);

    api.authorize(email, password).then((res) => {
      console.log("handleLogin: ", res);
      if (res.jwt) {
        localStorage.setItem("jwt", res.jwt);
        setUserData({
          email: res.user.email,
          password: res.user.password,
        });
        setLoggedIn(true);
        navigate("/");
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserData({
      username: "",
      email: "",
    });
    setLoggedIn(false);
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
    setIsSubmitPopupOpen(true);
    setCurrentCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSubmitPopupOpen(false);
    setSelectedCard(null);
  }

  function handleFormValidation(input, setInputValid, setInputErrorMessage) {
    if (input.validity.valid) {
      setInputValid(true);
      setInputErrorMessage("");
    } else {
      setInputValid(false);
      setInputErrorMessage(input.validationMessage);
    }
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
      .then((res) => {
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
              path="/"
              element={
                isLoading ? (
                  <Spinner />
                ) : (
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddCardClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleSubmitDeleteClick}
                    handleLogout={handleLogout}
                  />
                )
              }
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />

            {/* <Route>
              {loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
            </Route> */}
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            validateForm={handleFormValidation}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            validateForm={handleFormValidation}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            validateForm={handleFormValidation}
          />
          <SubmitPopup
            isOpen={isSubmitPopupOpen}
            onClose={closeAllPopups}
            onSubmitDelete={handleCardDelete}
            card={currentCard}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App;
