import { useRef, useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSending,
}) {
  const inputRef = useRef();
  const currentUser = useContext(CurrentUserContext);
  const [profileData, setProfileData] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState({});

  useEffect(() => {
    if (isOpen) inputRef.current.focus();

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
    setIsValid(input.closest('form').checkValidity());
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
      title="Update profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSending ? 'Saving...' : 'Save'}
      buttonActive={isValid}
    >
      <input
        className={`form__input ${
          validationMessage.name && 'form__input_type_error'
        }`}
        name="name"
        id="name-profile"
        type="text"
        placeholder="Username"
        minLength="2"
        maxLength="40"
        value={profileData.name || ''}
        onChange={handleChange}
        ref={inputRef}
        required
      />
      <span
        id="name-error"
        className={`form__input-error ${
          !isValid && 'form__input-error_visible'
        }`}
      >
        {validationMessage.name}
      </span>

      <input
        className={`form__input ${
          validationMessage.about && 'form__input_type_error'
        }`}
        name="about"
        id="about"
        type="text"
        placeholder="About"
        minLength="2"
        maxLength="200"
        value={profileData.about || ''}
        onChange={handleChange}
        required
      />
      <span
        id="about-error"
        className={`form__input-error ${
          !isValid && 'form__input-error_visible'
        }`}
      >
        {validationMessage.about}
      </span>
    </PopupWithForm>
  );
}
