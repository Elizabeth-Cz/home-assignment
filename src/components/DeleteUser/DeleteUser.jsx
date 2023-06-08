import "./DeleteUser.css";

const DeleteUser = ({ user, onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete(user);
    onClose();
  };

  return (
    <>
      <h3>Are you sure?</h3>
      <div className='buttons'>
        <button className='btn btn-delete' onClick={handleDelete}>
          Delete
        </button>
        <button className='btn btn-secondary' onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default DeleteUser;
