import { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ onAdd, onUpdate, user }) => {
  const [userData, setUserData] = useState({
    number: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    company: '',
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      setUserData({
        number: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        company: '',
      });
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onUpdate(userData);
    } else {
      onAdd(userData);
    }
    setUserData({
      number: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      company: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const { number, first_name, last_name, phone_number, email, company } =
    userData;

  return (
    <form onSubmit={onSubmit}>
      <div className='form-control'>
        <label htmlFor='number'>Employee Number</label>
        <input
          type='text'
          name='number'
          value={number}
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='first_name'>First Name</label>
        <input
          type='text'
          name='first_name'
          value={first_name}
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='last_name'>Last Name</label>
        <input
          type='text'
          name='last_name'
          value={last_name}
          onChange={handleChange}
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
        <label htmlFor='email'>Email Address</label>
        <input type='text' name='email' value={email} onChange={handleChange} />
      </div>
      <div className='form-control'>
        <label htmlFor='company'>Company</label>
        <input
          type='text'
          name='company'
          value={company}
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
