import { useRef, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isSending,
}) {
  const inputRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState({});

  useEffect(() => {
    if (isOpen) inputRef.current.focus();

    inputRef.current.value = '';
    setIsValid(false);
    setValidationMessage({});
  }, [isOpen]);

  function handleChange() {
    const input = inputRef.current;
    setIsValid(input.closest('form').checkValidity());
    setValidationMessage({
      [input.name]: input.validationMessage,
    });
  }

  function handleSubmit(evt) {
    const input = inputRef.current;
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
      buttonText={isSending ? 'Сохранение...' : 'Сохранить'}
      buttonActive={isValid}
    >
      <input
        className={`form__input ${
          validationMessage.avatar && 'form__input_type_error'
        }`}
        name="avatar"
        id="avatar"
        placeholder="Ссылка на изображение"
        type="url"
        ref={inputRef}
        onChange={handleChange}
        required
      />
      <span
        id="avatar-error"
        className={`form__input-error ${
          !isValid && 'form__input-error_visible'
        }`}
      >
        {validationMessage.avatar}
      </span>
    </PopupWithForm>
  );
}
