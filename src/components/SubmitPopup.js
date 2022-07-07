import PopupWithForm from "./PopupWithForm";

export default function SubmitPopup({ isOpen, onClose, onSubmitDelete, card }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitDelete(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="card-delete"
      title="Вы уверены?"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Да"
    ></PopupWithForm>
  );
}
