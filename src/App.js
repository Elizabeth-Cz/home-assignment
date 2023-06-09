import './App.css';
import UserCard from './components/UserCard/UserCard';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import UserForm from './components/UserForm/UserForm';
import Modal from './components/Modal/Modal';
import DeleteUser from './components/DeleteUser/DeleteUser';
import Button from './components/button/Button';

function App() {
  const storedEmployees = localStorage.getItem('employees');
  const [employees, setEmployees] = useState(
    storedEmployees ? JSON.parse(storedEmployees) : []
  );
  const [modal, setModal] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDelete = (employee) => {
    setModal('delete');
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee) => {
    setModal('edit');
    setSelectedEmployee(employee);
  };

  const handleAddUser = (newUser) => {
    setEmployees([...employees, newUser]);
    setModal('');
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedEmployees = employees.map((employee) =>
      employee.number === selectedEmployee.number ? updatedUser : employee
    );
    setEmployees(updatedEmployees);
    setModal('');
  };

  const handleDeleteUser = () => {
    const updatedEmployees = employees.filter(
      (employee) => employee.number !== selectedEmployee.number
    );
    setEmployees(updatedEmployees);
    setModal('');
  };

  useEffect(() => {
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  return (
    <>
      {modal !== '' && (
        <Modal onClose={() => setModal('')}>
          {modal === 'edit' && (
            <UserForm onUpdate={handleUpdateUser} user={selectedEmployee} />
          )}
          {modal === 'add' && <UserForm onAdd={handleAddUser} />}
          {modal === 'delete' && (
            <DeleteUser
              user={selectedEmployee}
              onDelete={handleDeleteUser}
              onClose={() => setModal('')}
            />
          )}
        </Modal>
      )}
      <div className='page'>
        <h1>Assignment</h1>
        <div className='controls'>
          <div className='search-bar'>
            <AiOutlineSearch className='search-icon' />
            <input type='text' name='search' className='search-input' />
          </div>
          <select name='sort' id='sort'>
            <option value=''>Sort By...</option>
            <option value='name'>Name</option>
            <option value='number'>Employee Number</option>
            <option value='company'>Company</option>
          </select>
          <Button
            variant='primary'
            onClick={() => {
              setModal('add');
            }}
          >
            + Add Employee
          </Button>
        </div>
        {employees && employees.length > 0 && (
          <div className='grid'>
            {employees.map((employee) => (
              <UserCard
                key={employee.number}
                user={employee}
                onDelete={() => handleDelete(employee)}
                onEdit={() => handleEdit(employee)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
