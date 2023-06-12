import { useState, useEffect } from 'react';
import './UserForm.css';

const initialUserData = {
  user_id: '',
  employee_number: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  email_address: '',
  company_id: '',
};

const UserForm = ({ onAdd, onUpdate, user }) => {
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      setUserData(initialUserData);
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onUpdate(userData);
    } else {
      const newUser = { ...userData, user_id: genetateUniqueId() };
      onAdd(newUser);
    }
    setUserData(initialUserData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const {
    employee_number,
    first_name,
    last_name,
    phone_number,
    email_address,
    company_id,
  } = userData;

  const genetateUniqueId = () => {
    const uuid = require('uuid');
    return uuid.v4();
  };
  return (
    <form onSubmit={onSubmit}>
      <div className='form-control'>
        <label htmlFor='employee_number'>Employee Number</label>
        <input
          type='text'
          name='employee_number'
          value={employee_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-control'>
        <label htmlFor='first_name'>First Name</label>
        <input
          type='text'
          name='first_name'
          value={first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-control'>
        <label htmlFor='last_name'>Last Name</label>
        <input
          type='text'
          name='last_name'
          value={last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-control'>
        <label htmlFor='phone_number'>Phone Number</label>
        <input
          type='text'
          name='phone_number'
          value={phone_number}
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='email_address'>Email Address</label>
        <input
          type='text'
          name='email_address'
          value={email_address}
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='company_id'>Company</label>
        <input
          type='text'
          name='company_id'
          value={company_id}
          onChange={handleChange}
        />
      </div>
      <button className='btn btn-primary' type='submit'>
        {user ? 'Update User' : 'Add Employee'}
      </button>
    </form>
  );
};

export default UserForm;
