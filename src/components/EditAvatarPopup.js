import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState({});

  useEffect(() => {
    avatarRef.current.value = "";
    setIsValid(false);
    setValidationMessage({});
  }, [isOpen]);

  function handleChange() {
    const input = avatarRef.current;
    setIsValid(input.closest("form").checkValidity());
    setValidationMessage({
      [input.name]: input.validationMessage,
    });
  }

  function handleSubmit(evt) {
    const input = avatarRef.current;
    evt.preventDefault();
    onUpdateAvatar({
      avatar: input.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="edit-avatar"
      title="Обновить аватар"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      buttonActive={isValid}
    >
      <input
        className={`form__input ${
          validationMessage.avatar && "form__input_type_error"
        }`}
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        type="url"
        ref={avatarRef}
        onChange={handleChange}
        required
      />
      <span
        id="avatar-error"
        className={`form__input-error ${
          !isValid && "form__input-error_visible"
        }`}
      >
        {validationMessage.avatar}
      </span>
    </PopupWithForm>
  );
}
