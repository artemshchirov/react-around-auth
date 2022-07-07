export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__container">
        <button
          className="button button_popup_close"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          className="form"
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          <fieldset className="form__container">
            <legend className="form__title">{props.title}</legend>
            {props.children}
            <button
              className={`button button_form_submit ${
                !props.buttonActive && "button_disabled"
              }`}
              type="submit"
              disabled={!props.buttonActive}
            >
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
