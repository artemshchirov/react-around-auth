import successIcon from "../images/info-success.svg";
import failIcon from "../images/info-fail.svg";

function InfoToolTip({ isOpen, onClose, currentStatus }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__overlay" onClick={onClose}></div>
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
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoToolTip;
