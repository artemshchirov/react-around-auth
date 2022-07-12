import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeData, setPlaceData] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState({});

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;
    setPlaceData((oldData) => ({
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
    onAddPlace({
      name: placeData.name,
      link: placeData.link,
    });
    setPlaceData({
      name: "",
      link: "",
    });
    setIsValid(false);
    setValidationMessage({});
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
      buttonActive={isValid}
    >
      <input
        className={`form__input ${
          validationMessage.name && "form__input_type_error"
        }`}
        placeholder="Название"
        type="text"
        name="name"
        id="name"
        minLength="2"
        maxLength="30"
        value={placeData.name || ""}
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
          validationMessage.link && "form__input_type_error"
        }`}
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        id="link"
        value={placeData.link || ""}
        onChange={handleChange}
        required
      />
      <span
        id="link-error"
        className={`form__input-error ${
          !isValid && "form__input-error_visible"
        }`}
      >
        {validationMessage.link}
      </span>
    </PopupWithForm>
  );
}
