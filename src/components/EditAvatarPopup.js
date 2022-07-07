import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  validateForm,
}) {
  
  const avatarRef = useRef();

  const [isAvatarUrlValid, setIsAvatarUrlValid] = useState(false);

  const [avatarUrlErrorMessage, setAvatarUrlErrorMessage] = useState("");

  function handleChangeAvatarUrl(evt) {
    validateForm(evt.target, setIsAvatarUrlValid, setAvatarUrlErrorMessage);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
    validateForm(
      avatarRef.current,
      setIsAvatarUrlValid,
      setAvatarUrlErrorMessage
    );
  }, [isOpen, validateForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="edit-avatar"
      title="Обновить аватар"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      buttonActive={isAvatarUrlValid}
    >
      <input
        className={`form__input ${
          !isAvatarUrlValid && "form__input_type_error"
        }`}
        name="link-avatar_input"
        id="link-avatar"
        placeholder="Ссылка на картинку"
        type="url"
        ref={avatarRef}
        onChange={handleChangeAvatarUrl}
        required
      />
      <span
        id="link-avatar-error"
        className={`form__input-error ${
          !isAvatarUrlValid && "form__input-error_visible"
        }`}
      >
        {!isAvatarUrlValid && avatarUrlErrorMessage}
      </span>
    </PopupWithForm>
  );
}
