import "./App.css";
import UserCard from "./components/UserCard/UserCard";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import UserForm from "./components/UserForm/UserForm";
import Modal from "./components/Modal/Modal";
import DeleteUser from "./components/DeleteUser/DeleteUser";

function App() {
  const [employees, setEmployees] = useState([]);
  const [modal, setModal] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDelete = (id) => {
    setModal("delete");
    setSelectedEmployee(id);
  };

  const handleEdit = (id) => {
    setModal("edit");
    setSelectedEmployee(id);
  };

  const handleAddUser = (newUser) => {
    setEmployees([...employees, newUser]);
    setModal("");
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedEmployees = employees.map((employee) =>
      employee.number === selectedEmployee.number ? updatedUser : employee
    );
    setEmployees(updatedEmployees);
    setModal("");
  };

  const handleDeleteUser = () => {
    const updatedEmployees = employees.filter(
      (employee) => employee.number !== selectedEmployee.number
    );
    setEmployees(updatedEmployees);
    setModal("");
  };

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      setEmployees([
        {
          number: 3,
          first_name: "Liz",
          last_name: "Czarny",
          phone_number: "0744530109",
          email: "liz.cz91@gmail.com",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <>
      {modal !== "" && (
        <Modal onClose={() => setModal("")}>
          {modal === "edit" && (
            <UserForm onUpdate={handleUpdateUser} user={selectedEmployee} />
          )}
          {modal === "add" && <UserForm onAdd={handleAddUser} />}
          {modal === "delete" && (
            <DeleteUser
              user={selectedEmployee}
              onDelete={handleDeleteUser}
              onClose={() => setModal("")}
            />
          )}
        </Modal>
      )}
      <h1>Assignment</h1>
      <button className='btn btn-primary' onClick={() => setModal("add")}>
        + Add Employee
      </button>
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
    </>
  );
}

export default App;
