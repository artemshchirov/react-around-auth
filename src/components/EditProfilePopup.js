import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [profileData, setProfileData] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState({});

  useEffect(() => {
    setProfileData({
      name: currentUser.name,
      about: currentUser.about,
    });
    setIsValid(true);
    setValidationMessage({});
  }, [currentUser, isOpen]);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;
    setProfileData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
    setIsValid(input.closest("form").checkValidity());
    setValidationMessage({
      ...validationMessage,
      [name]: input.validationMessage,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: profileData.name,
      about: profileData.about,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="profile-edit"
      title="Редактировать профиль"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      buttonActive={isValid}
    >
      <input
        className={`form__input ${
          validationMessage.name && "form__input_type_error"
        }`}
        name="name"
        id="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={profileData.name || ""}
        onChange={handleChange}
        required
      />
      <span
        id="name-error"
        className={`form__input-error ${
          !isValid && "form__input-error_visible"
        }`}
      >
        {validationMessage.name}
      </span>

      <input
        className={`form__input ${
          validationMessage.about && "form__input_type_error"
        }`}
        name="about"
        id="about"
        type="text"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        value={profileData.about || ""}
        onChange={handleChange}
        required
      />
      <span
        id="about-error"
        className={`form__input-error ${
          !isValid && "form__input-error_visible"
        }`}
      >
        {validationMessage.about}
      </span>
    </PopupWithForm>
  );
}
