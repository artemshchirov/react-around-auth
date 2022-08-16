import { useEffect } from 'react';
import successIcon from '../images/info-success.svg';
import failIcon from '../images/info-fail.svg';

function InfoToolTip({ isOpen, onClose, currentStatus }) {
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
        <img
          src={currentStatus ? successIcon : failIcon}
          alt="Результат попытки регистрации"
          className="popup__icon"
        />
        <p className="popup__status">
          {currentStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </div>
  );
}

export default InfoToolTip;
