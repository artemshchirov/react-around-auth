import { useEffect } from 'react';

export default function PopupWithForm({
  isOpen,
  title,
  onClose,
  onSubmit,
  buttonText = 'Сохранить',
  buttonActive,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeCLose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeCLose);
    return () => {
      document.removeEventListener('keydown', handleEscapeCLose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget && isOpen) onClose();
  };

  return (
    <div
      className={`popup ${isOpen && 'popup_opened'}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="popup__overlay" onClick={handleOverlayClose}></div>
      <div className="popup__container">
        <button
          className="button button_popup_close"
          type="button"
          onClick={onClose}
        ></button>
        <form className="form" onSubmit={onSubmit} noValidate>
          <fieldset className="form__container">
            <legend className="form__title">{title}</legend>
            {children}
            <button
              className={`button button_form_submit ${
                !buttonActive && 'button_disabled'
              }`}
              type="submit"
              disabled={!buttonActive}
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
