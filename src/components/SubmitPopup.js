import PopupWithForm from './PopupWithForm';

export default function SubmitPopup({
  isOpen,
  onClose,
  onSubmitDelete,
  card,
  isSending,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitDelete(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="card-delete"
      title="Are you sure?"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSending ? 'Deleting...' : 'Yes'}
      buttonActive={true}
    ></PopupWithForm>
  );
}
