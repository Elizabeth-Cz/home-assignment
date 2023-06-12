import './Footer.css';
import { AiOutlineGlobal } from 'react-icons/ai';

const Footer = () => {
  const date = new Date();
  return (
    <footer>
      <p>&copy; Elizabeth Czarny {date.getFullYear()}</p>

      <a href='https://www.elizabeththedeveloper.com/'>
        {' '}
        <AiOutlineGlobal size={20} />
      </a>
    </footer>
  );
};

export default Footer;
