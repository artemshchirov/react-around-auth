import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  validateForm,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
    validateForm(evt.target, setIsNameValid, setNameErrorMessage);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    validateForm(evt.target, setIsDescriptionValid, setDescriptionErrorMessage);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsNameValid(true);
    setIsDescriptionValid(true);
    setNameErrorMessage("");
    setDescriptionErrorMessage("");
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="profile-edit"
      title="Редактировать профиль"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      buttonActive={isNameValid && isDescriptionValid}
    >
      <input
        className={`form__input ${!isNameValid && "form__input_type_error"}`}
        name="name-edit_input"
        id="name-edit"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleChangeName}
        required
      />
      <span
        id="name-edit-error"
        className={`form__input-error ${
          !isNameValid && "form__input-error_visible"
        }`}
      >
        {!isNameValid && nameErrorMessage}
      </span>
      <input
        className={`form__input ${
          !isDescriptionValid && "form__input_type_error"
        }`}
        name="about-edit_input"
        id="about-edit"
        type="text"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleChangeDescription}
        required
      />
      <span
        id="about-edit-error"
        className={`form__input-error ${
          !isDescriptionValid && "form__input-error_visible"
        }`}
      >
        {!isDescriptionValid && descriptionErrorMessage}
      </span>
    </PopupWithForm>
  );
}
