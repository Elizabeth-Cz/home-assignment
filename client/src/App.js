import './App.css';
import axios from 'axios';
import UserCard from './components/UserCard/UserCard';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import UserForm from './components/UserForm/UserForm';
import Modal from './components/Modal/Modal';
import DeleteUser from './components/DeleteUser/DeleteUser';
import Button from './components/button/Button';

function App() {
  const [employees, setEmployees] = useState([]);
  const [modal, setModal] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setModal('delete');
  };

  const handleEdit = (employee) => {
    setModal('edit');
    setSelectedEmployee(employee);
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:5000/users', newUser);
      const createdUser = response.data;
      setEmployees([...employees, createdUser]);
      setModal('');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await axios.put(
        `http://localhost:5000/users/${selectedEmployee.user_id}`,
        updatedUser
      );
      const updatedEmployees = employees.map((employee) =>
        employee.user_id === selectedEmployee.user_id ? updatedUser : employee
      );

      setEmployees(updatedEmployees);
      setModal('');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/users/${selectedEmployee.user_id}`
      );

      const updatedEmployees = employees.filter(
        (employee) => employee.user_id !== selectedEmployee.user_id
      );
      setEmployees(updatedEmployees);
      setModal('');
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    const users = await response.data;
    setEmployees(users);
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log(employees);

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
        <div className='controls'>
          <h1>Assignment</h1>
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
                key={employee.user_id}
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
