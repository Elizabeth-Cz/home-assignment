import './Button.css';

const Button = ({ children, onClick, variant, type }) => {
  const buttonClassName = `btn btn-${variant}`;
  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type={type ? type : ''}
    >
      {children}
    </button>
  );
};

export default Button;
