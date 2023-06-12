import Button from '../Button/Button';
import './DeleteUser.css';

const DeleteUser = ({ user, onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete(user);
    onClose();
  };

  return (
    <>
      <h3>Are you sure?</h3>
      <div className='buttons'>
        <Button onClick={handleDelete} variant='delete'>
          delete
        </Button>
        <Button onClick={onClose} variant='secondary'>
          cancel
        </Button>
      </div>
    </>
  );
};

export default DeleteUser;
