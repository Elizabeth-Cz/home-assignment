import UserForm from "./UserForm/UserForm";
import UserCard from "./UserCard/UserCard";
const InputUser = () => {
  // this should open a modal with a form for adding a user
  return (
    <>
      <h1>Input User</h1>
      <UserCard
        firstName={"Elizabeth"}
        lastName={"Czarny"}
        employeeNumber={"55"}
        phoneNumber={"0744530109"}
        emailAddress={"liz.cz91@gmail.com"}
      />
      <UserForm />
    </>
  );
};

export default InputUser;
