import './UserCard.css';
import {
  AiFillDelete,
  AiOutlineNumber,
  AiOutlinePhone,
  AiOutlineMail,
  AiFillEdit,
} from 'react-icons/ai';
import Button from '../button/Button';

const UserCard = ({ user, onDelete, onEdit }) => {
  const { first_name, last_name, number, phone_number, email } = user;
  return (
    <div className='user-card'>
      <Button variant='edit' onClick={onEdit}>
        <AiFillEdit />
      </Button>
      <h2 className='badge'>
        {(first_name || '').charAt(0)}
        {(last_name || '').charAt(0)}
      </h2>
      <div className='user-info'>
        <h3>
          {first_name} {last_name}
        </h3>
        <p className='user-info-control'>
          <AiOutlineNumber />
          {number}
        </p>
        <p className='user-info-control'>
          <AiOutlinePhone />
          {phone_number}
        </p>
        <p className='user-info-control'>
          <AiOutlineMail />
          {email}
        </p>
      </div>

      <Button variant='delete' onClick={onDelete}>
        <AiFillDelete className='icon' />
        <span className='text'>Delete</span>
      </Button>
    </div>
  );
};

export default UserCard;
