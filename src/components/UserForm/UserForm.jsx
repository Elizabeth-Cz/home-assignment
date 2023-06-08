import { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ onAdd, onUpdate, user }) => {
  const [employee, setEmployee] = useState({
    number: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    company: "",
  });

  useEffect(() => {
    if (user) {
      setEmployee(user);
    } else {
      setEmployee({
        number: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        company: "",
      });
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onUpdate(employee);
    } else {
      onAdd(employee);
    }
    setEmployee({
      number: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      company: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-control'>
        <label htmlFor='number'>Employee Number</label>
        <input
          type='text'
          name='number'
          value={employee.number}
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='first_name'>First Name</label>
        <input
          type='text'
          name='first_name'
          value={employee.first_name}
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='last_name'>Last Name</label>
        <input
          type='text'
          name='last_name'
          value={employee.last_name}
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='phone_number'>Phone Number</label>
        <input
          type='text'
          name='phone_number'
          value={employee.phone_number}
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='email'>Email Address</label>
        <input
          type='text'
          name='email'
          value={employee.email}
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='company'>Company</label>
        <input
          type='text'
          name='company'
          value={employee.company}
          onChange={handleChange}
        />
      </div>
      <button className='btn btn-primary' type='submit'>
        {user ? "Update User" : "+ Add User"}
      </button>
    </form>
  );
};

export default UserForm;
