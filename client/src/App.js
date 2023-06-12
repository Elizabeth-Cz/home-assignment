import './App.css';
import UserCard from './components/UserCard/UserCard';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import UserForm from './components/UserForm/UserForm';
import Modal from './components/Modal/Modal';
import DeleteUser from './components/DeleteUser/DeleteUser';
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';

function App() {
  const fakeUsers = [
    {
      user_id: 1,
      employee_number: 'E12345',
      first_name: 'John',
      last_name: 'Doe',
      email_address: 'john.doe@example.com',
      phone_number: '123-456-7890',
      company_id: 'C001',
    },
    {
      user_id: 2,
      employee_number: 'E23456',
      first_name: 'Jane',
      last_name: 'Smith',
      email_address: 'jane.smith@example.com',
      phone_number: '987-654-3210',
      company_id: 'C002',
    },
    {
      user_id: 3,
      employee_number: 'E34567',
      first_name: 'Robert',
      last_name: 'Johnson',
      email_address: 'robert.johnson@example.com',
      phone_number: '555-123-4567',
      company_id: 'C003',
    },
    {
      user_id: 4,
      employee_number: 'E45678',
      first_name: 'Emily',
      last_name: 'Williams',
      email_address: 'emily.williams@example.com',
      phone_number: '111-222-3333',
      company_id: 'C001',
    },
    {
      user_id: 5,
      employee_number: 'E56789',
      first_name: 'Michael',
      last_name: 'Brown',
      email_address: 'michael.brown@example.com',
      phone_number: '444-555-6666',
      company_id: 'C002',
    },
  ];

  const [employees, setEmployees] = useState([]);
  const [modal, setModal] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleAddUser = (newUser) => {
    setEmployees([...employees, newUser]);
    setModal('');
    saveToLocalStorage([...employees, newUser]);
  };

  const handleDelete = (employee) => {
    setModal('delete');
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee) => {
    setModal('edit');
    setSelectedEmployee(employee);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedEmployees = employees.map((employee) =>
      employee.user_id === selectedEmployee.user_id ? updatedUser : employee
    );
    setEmployees(updatedEmployees);
    setModal('');
    saveToLocalStorage(updatedEmployees);
  };

  const handleDeleteUser = () => {
    const updatedEmployees = employees.filter(
      (employee) => employee.user_id !== selectedEmployee.user_id
    );
    setEmployees(updatedEmployees);
    setModal('');
    saveToLocalStorage(updatedEmployees);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = employees.filter((employee) => {
      const fullName = `${employee.first_name} ${employee.last_name}`;
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredEmployees(filtered);
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem('employees', JSON.stringify(data));
  };

  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      setEmployees(fakeUsers);
      saveToLocalStorage(fakeUsers);
    }
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) => {
        const fullName = `${employee.first_name} ${employee.last_name}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [employees, searchQuery]);

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
        <h1>User Management System</h1>
        <div className='controls'>
          <Button
            variant='primary'
            onClick={() => {
              setModal('add');
            }}
          >
            + Add Employee
          </Button>
          <div className='search-bar'>
            <AiOutlineSearch className='search-icon' />
            <input
              className='search-input'
              type='text'
              value={searchQuery}
              onChange={(e) => handleSearch(e)}
              placeholder='Search by name...'
            />
          </div>
        </div>
        {filteredEmployees && filteredEmployees.length > 0 && (
          <div className='grid'>
            {filteredEmployees.map((employee) => (
              <UserCard
                key={employee.user_id}
                user={employee}
                onDelete={() => handleDelete(employee)}
                onEdit={() => handleEdit(employee)}
              />
            ))}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
